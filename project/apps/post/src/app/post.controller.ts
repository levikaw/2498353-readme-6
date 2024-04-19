import { Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryParamsDto, SuccessResponse } from '@project/common';
import { PostAccessEntity, CommonPost } from '@project/post-access';
import { PostService } from './post.service';

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

  @Delete('/:id')
  @ApiOkResponse()
  public async deletePost(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.postService.deletePostById(id);
  }

  @Put('repost/:postId/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async rePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommonPost> {
    try {
      return await this.postService.rePost(postId, userId);
    } catch (error) {
      Logger.error(error, `rePost - postId: ${postId}, userId: ${userId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
