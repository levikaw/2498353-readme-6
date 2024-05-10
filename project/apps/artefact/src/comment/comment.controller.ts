import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUserFromToken, JwtAuthGuard, PaginationResponseDto } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { ArtefactsCountDto, CreateCommentDto, CommentDto } from '@project/dtos/artefact-dto';
import { CommentService } from './comment.service';
import { USER_EXCEPTION } from '@project/constants/exception-messages';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<CommentDto[]>,
    isArray: false,
    description: 'Get comments by postId, support pagination. PageSize = 50',
  })
  @Get('/:postId/:page')
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'page',
    type: Number,
    required: true,
    description: 'page number fo pagination',
  })
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('page', ParseIntPipe) page: number,
  ): Promise<PaginationResponseDto<CommentDto[]>> {
    try {
      const [data, total] = await Promise.all([
        this.commentService.findCommentsByPostId(postId, page),
        this.commentService.countByPostId(postId),
      ]);
      return { data, total };
    } catch (error) {
      Logger.error(error);
      return { data: [], total: 0 };
    }
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Array<ArtefactsCountDto>,
    isArray: true,
    description: 'Get comments coun per posts',
  })
  @Get()
  @ApiQuery({
    name: 'postsIds',
    type: [String],
    required: true,
    isArray: true,
    description: 'array of posts identificators',
  })
  public async getCommentsCountByPostsId(@Query('postsIds') postsIds: string[]): Promise<ArtefactsCountDto[]> {
    try {
      const countCommentsByPostsTds = await Promise.all(
        postsIds.map((postId) => this.commentService.countByPostId(postId).then((count) => ({ postId, count }))),
      );
      return countCommentsByPostsTds;
    } catch (error) {
      Logger.error(error);
      return postsIds.map((postId) => ({ postId, count: 0 }));
    }
  }

  @ApiOkResponse({
    type: CommentDto,
    isArray: false,
    description: 'Create comment by postId',
  })
  @ApiBody({
    type: CreateCommentDto,
    required: true,
    isArray: false,
  })
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
  })
  public async createCommentByPostId(
    @Body() comment: CreateCommentDto,
    @Param('postId', ParseUUIDPipe) postId: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<CommentDto> {
    try {
      return await this.commentService.createCommentByPostId(comment.text, postId, user.userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot create comment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({
    description: 'delete comment by id',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'comment id',
  })
  public async deleteCommentById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<void> {
    try {
      const comment = await this.commentService.findCommentById(id);
      if (comment.userId !== user.userId) {
        throw new HttpException(`${USER_EXCEPTION.NOT_OWN} comment`, HttpStatus.FORBIDDEN);
      }
      return await this.commentService.deleteCommentById(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot delete comment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
