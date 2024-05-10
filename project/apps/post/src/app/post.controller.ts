import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUserFromToken, JwtAuthGuard, PaginationResponseDto } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { CommonPostDto, WritePostDto, PostsQueryDto, UpdatePostDto } from '@project/dtos/post-dto';
import { POST_EXCEPTION } from '@project/constants/exception-messages';
import { PostService } from './post.service';
import { isNotEmpty } from 'class-validator';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:postId')
  @ApiOkResponse({
    type: CommonPostDto,
    isArray: false,
    description: 'get post by post id',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
  })
  public async getPostById(@Param('postId', ParseUUIDPipe) postId: string): Promise<CommonPostDto> {
    try {
      return this.postService.findPostById(postId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot found post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponseDto<CommonPostDto[]>,
    description: 'Get Post by filter. Support pagination',
    isArray: false,
  })
  @ApiQuery({
    required: false,
    type: PostsQueryDto,
    isArray: false,
  })
  public async getAllPosts(@Query() params: PostsQueryDto): Promise<PaginationResponseDto<CommonPostDto[]>> {
    try {
      const [data, total] = await Promise.all([
        this.postService.findPosts(params.filter, params.page, params.limit),
        this.postService.countBy(params.filter),
      ]);
      return { data, total };
    } catch (error) {
      Logger.error(error);
      return { data: [], total: 0 };
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Delete post by post identificator',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Post id that delete',
    required: true,
  })
  public async deletePostById(@Param('id', ParseUUIDPipe) id: string, @CurrentUserFromToken() user: TokenUserDto): Promise<void> {
    try {
      const post = await this.postService.findPostById(id);

      if (post.userId !== user.userId) {
        throw new HttpException(POST_EXCEPTION.FORBIDDEN, HttpStatus.FORBIDDEN);
      }

      return this.postService.deletePostById(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot delete post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('repost/:postId')
  @ApiOkResponse({
    type: CommonPostDto,
    isArray: false,
    description: 'Do repost',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    description: 'Post id that repost',
    required: true,
  })
  @ApiBearerAuth()
  public async rePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<CommonPostDto> {
    try {
      const post = await this.postService.findPostById(postId);

      if (isNotEmpty(post.repostedFromPostId)) {
        const repostedPost = await this.postService.findPostById(postId);
        if (repostedPost.userId === user.userId) {
          throw new HttpException(POST_EXCEPTION.IS_REPOSTED, HttpStatus.FORBIDDEN);
        }
      }

      if (post.userId === user.userId) {
        throw new HttpException(POST_EXCEPTION.REPOST_FORBIDDEN, HttpStatus.FORBIDDEN);
      }

      return await this.postService.rePost(postId, user.userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot repost', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    required: true,
    isArray: false,
    type: WritePostDto,
  })
  @ApiOkResponse({
    type: CommonPostDto,
    isArray: false,
    description: 'Create and retruen created post',
  })
  public async createPost(@CurrentUserFromToken() user: TokenUserDto, @Body() post: WritePostDto): Promise<CommonPostDto> {
    try {
      return this.postService.createPost({ type: post.type, userId: user.userId, ...post[post.type] });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot create post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    isArray: false,
    type: WritePostDto,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Update post by postId',
  })
  public async updatePost(
    @CurrentUserFromToken() user: TokenUserDto,
    @Param('postId') postId: string,
    @Body() post: UpdatePostDto,
  ): Promise<CommonPostDto> {
    try {
      const currentPost = await this.postService.findPostById(postId);

      if (isNotEmpty(currentPost.repostedFromPostId)) {
        throw new HttpException(POST_EXCEPTION.IS_REPOSTED, HttpStatus.FORBIDDEN);
      }

      if (currentPost.userId !== user.userId) {
        throw new HttpException(POST_EXCEPTION.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
      return await this.postService.updatePostById({ ...post[post.type], id: postId });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot update post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
