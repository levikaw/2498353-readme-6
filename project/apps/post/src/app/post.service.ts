import { Injectable } from '@nestjs/common';
import { PostAccessEntity, PostAccessRepository, CommonPost } from '@project/post-access';
import { POST_EXCEPTION_MESSAGES } from './constants';

@Injectable()
export class PostService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  public async createPost(post: CommonPost, userId: string): Promise<PostAccessEntity> {
    return this.postAccessRepository.save(new PostAccessEntity({ ...post, userId }));
  }

  public async findAllPosts(): Promise<CommonPost[]> {
    return this.postAccessRepository.findAll();
  }

  public async findPostById(id: string): Promise<CommonPost> {
    return this.postAccessRepository.findById(id).then((resp) => resp.toObject());
  }

  public async findPostByUserId(userId: string): Promise<CommonPost[]> {
    return this.postAccessRepository.findByUserId(userId).then((resp) => resp.map((post) => post.toObject()));
  }

  public async rePost(postId: string, userId: string): Promise<CommonPost> {
    const existsPost = await this.postAccessRepository.findById(postId);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION_MESSAGES.NotFound);
    }

    delete existsPost.createdAt;
    delete existsPost.id;
    existsPost.userId = userId;
    existsPost.repostedFromPostId = postId;
    existsPost.isReposted = true;

    return this.postAccessRepository.save(new PostAccessEntity(existsPost)).then((resp) => resp.toObject());
  }

  public async updatePostById(post: CommonPost, id: string): Promise<void> {
    const existsPost = await this.postAccessRepository.findById(id);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION_MESSAGES.NotFound);
    }

    this.postAccessRepository.update(new PostAccessEntity({ ...post, id: existsPost.id }));
  }

  public async deletePostById(id: string): Promise<void> {
    // TODO: удаление артефактов публикации
    this.postAccessRepository.deleteById(id);
  }
}
