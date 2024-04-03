import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostAccessEntity, CommonPost } from '@project/post-access';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Получение детальной информации о публикации
   * @param {string} postId
   * @returns {Promise<CommonPost>}
   */
  @Get('/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async getPostById(@Param('postId') postId: string): Promise<CommonPost> {
    return await this.postService.findPostById(postId);
  }

  /**
   * Получение публикаций для пользователя по идентификатору
   * @param {string} userId
   * @returns {Promise<CommonPost[]>}
   */
  @Get('/:userId')
  @ApiOkResponse({ type: [PostAccessEntity] })
  public async getPostByUserId(@Param('userId') userId: string): Promise<CommonPost[]> {
    return await this.postService.findPostByUserId(userId);
  }

  /**
   * Лента публикаций
   * @returns {Promise<CommonPost[]>}
   */
  @Get()
  @ApiOkResponse({ type: [PostAccessEntity] })
  public async getPosts(): Promise<CommonPost[]> {
    return await this.postService.findAll();
  }

  /**
   * Удаление поста по идентификатору
   * @param {string} postId
   */
  @Delete('/:postId')
  // @ApiOkResponse({ type: PostAccessEntity })
  public async deletePost(@Param('postId') postId: string): Promise<void> {
    return await this.postService.deletePost(postId);
  }

  /**
   * Репост
   * @param {string} postId
   * @param {string} userId
   * @returns {Promise<CommonPost>}
   */
  @Post('/:postId/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async rePost(@Param('postId') postId: string, @Param('userId') userId: string): Promise<CommonPost> {
    return await this.postService.rePost(postId, userId);
  }
}
