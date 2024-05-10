import { Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryParamsDto, SuccessResponse } from '@project/common';
import { PostAccessEntity, CommonPost } from '@project/post-access';
import { POST_EXCEPTIONS } from '../constants';
import { PostService } from '../post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async getPostById(@Param('postId', ParseUUIDPipe) postId: string): Promise<CommonPost> {
    return this.postService.findPostById(postId);
  }

  @Get()
  @ApiOkResponse({ type: [PostAccessEntity] })
  public async getAllPosts(@Query() params?: QueryParamsDto<CommonPost>): Promise<SuccessResponse<CommonPost[]>> {
    return Promise.all([this.postService.findPosts(params), this.postService.countBy(params?.filter)]).then(
      (resp) => new SuccessResponse(resp),
    );
  }

  @Delete('/:postId/:userId')
  @ApiOkResponse()
  public async deletePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    const post = await this.postService.findPostById(postId);
    if (post.userId === userId) {
      return this.postService.deletePostById(postId);
    } else {
      throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }

  @Put('repost/:postId/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async rePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommonPost> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId !== userId) {
        return await this.postService.rePost(postId, userId);
      } else {
        throw new HttpException(POST_EXCEPTIONS.REPOST_FORBIDDEN, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      Logger.error(error, `rePost - postId: ${postId}, userId: ${userId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
