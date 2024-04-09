import { Injectable } from '@nestjs/common';
import { PostAccessEntity, PostAccessRepository, CommonPost } from '@project/post-access';

@Injectable()
export class PostService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  /**
   * Создание поста
   * @param {CommonPost} dto
   * @param {string} userId
   * @returns {Promise<PostAccessEntity>}
   */
  public async createPost(dto: CommonPost, userId: string): Promise<PostAccessEntity> {
    return await this.postAccessRepository.save(new PostAccessEntity({ ...dto, userId }));
  }

  /**
   * Лента публикаций
   * @returns {Promise<CommonPost[]>}
   */
  public async findAll(): Promise<CommonPost[]> {
    return await this.postAccessRepository.findAll();
  }

  /**
   * Поиск поста по идентификатору
   * @param {string} postId
   * @returns {Promise<CommonPost>}
   */
  public async findPostById(postId: string): Promise<CommonPost> {
    return (await this.postAccessRepository.findById(postId)).toObject();
  }

  /**
   * Поиск постов пользователя по идентификатору
   * @param {string} userId
   * @returns {Promise<CommonPost[]>}
   */
  public async findPostByUserId(userId: string): Promise<CommonPost[]> {
    return (await this.postAccessRepository.findByUserId(userId)).map((post) => post.toObject());
  }

  /**
   * Репост
   * @param {string} postId
   * @param {string} userId
   * @returns {Promise<CommonPost>}
   */
  public async rePost(postId: string, userId: string): Promise<CommonPost> {
    const existsPost = await this.postAccessRepository.findById(postId);
    delete existsPost.createdAt;
    delete existsPost.id;
    existsPost.userId = userId;
    existsPost.repostedFrom = postId;
    existsPost.reposted = true;

    return (await this.postAccessRepository.save(new PostAccessEntity(existsPost))).toObject();
  }

  /**
   * Обновление поста по идентификатору
   * @param {CommonPost} dto
   * @param {string} postId
   */
  public async updatePost(dto: CommonPost, postId: string): Promise<void> {
    const existsPost = await this.postAccessRepository.findById(postId);

    await this.postAccessRepository.update(new PostAccessEntity({ ...dto, id: existsPost.id }));
  }

  /**
   * Удаление поста по идентификатору
   * @param {string} postId
   */
  public async deletePost(postId: string): Promise<void> {
    // TODO: удаление артефактов публикации
    await this.postAccessRepository.deleteById(postId);
  }
}
