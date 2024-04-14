import { Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostAccessEntity, CommonPost } from '@project/post-access';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async getPostById(@Param('postId') postId: string): Promise<CommonPost> {
    return this.postService.findPostById(postId);
  }

  @Get()
  @ApiOkResponse({ type: [PostAccessEntity] })
  public async getPosts(): Promise<CommonPost[]> {
    return this.postService.findPosts();
  }

  @Get('userId/:userId')
  @ApiOkResponse({ type: [PostAccessEntity] })
  public async getPostByUserId(@Param('userId') userId: string): Promise<CommonPost[]> {
    return this.postService.findPosts({ userId });
  }

  @Delete('/:id')
  @ApiOkResponse()
  public async deletePost(@Param('id') id: string): Promise<void> {
    return this.postService.deletePostById(id);
  }

  @Put('repost/:postId/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async rePost(@Param('postId') postId: string, @Param('userId') userId: string): Promise<CommonPost> {
    try {
      return await this.postService.rePost(postId, userId);
    } catch (error) {
      Logger.error(error, `rePost - postId: ${postId}, userId: ${userId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
