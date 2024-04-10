import { Injectable } from '@nestjs/common';
import { PostAccessEntity, PostAccessRepository, CommonPost } from '@project/post-access';

@Injectable()
export class PostService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  public async createPost(post: CommonPost, userId: string): Promise<PostAccessEntity> {
    return await this.postAccessRepository.save(new PostAccessEntity({ ...post, userId }));
  }

  public async findAllPosts(): Promise<CommonPost[]> {
    return await this.postAccessRepository.findAll();
  }

  public async findPostById(id: string): Promise<CommonPost> {
    return (await this.postAccessRepository.findById(id)).toObject();
  }

  public async findPostByUserId(userId: string): Promise<CommonPost[]> {
    return (await this.postAccessRepository.findByUserId(userId)).map((post) => post.toObject());
  }

  public async rePost(postId: string, userId: string): Promise<CommonPost> {
    const existsPost = await this.postAccessRepository.findById(postId);
    delete existsPost.createdAt;
    delete existsPost.id;
    existsPost.userId = userId;
    existsPost.repostedFromPostId = postId;
    existsPost.isReposted = true;

    return (await this.postAccessRepository.save(new PostAccessEntity(existsPost))).toObject();
  }

  public async updatePostById(post: CommonPost, id: string): Promise<void> {
    const existsPost = await this.postAccessRepository.findById(id);

    await this.postAccessRepository.update(new PostAccessEntity({ ...post, id: existsPost.id }));
  }

  public async deletePostById(id: string): Promise<void> {
    // TODO: удаление артефактов публикации
    await this.postAccessRepository.deleteById(id);
  }
}
