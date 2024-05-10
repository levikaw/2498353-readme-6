import { Injectable } from '@nestjs/common';
import { PostAccessEntity, PostAccessRepository, CommonPostInterface, PostFilterInterface } from '@project/post-access';
import { UpdateCommonPostInterface } from '@project/post-access';
import { POST_EXCEPTION } from '@project/constants/exception-messages';

@Injectable()
export class PostService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  public async createPost(post: CommonPostInterface): Promise<PostAccessEntity> {
    return this.postAccessRepository.save(new PostAccessEntity(post));
  }

  public async findPosts(filter: PostFilterInterface, page: number, limit: number): Promise<CommonPostInterface[]> {
    return this.postAccessRepository.findManyBy(filter, page, limit);
  }

  public async countBy(filter: PostFilterInterface): Promise<number> {
    return this.postAccessRepository.countBy(filter);
  }

  public async findPostById(id: string): Promise<CommonPostInterface> {
    return this.postAccessRepository.findById(id).then((resp) => resp?.toObject());
  }

  public async rePost(postId: string, userId: string): Promise<CommonPostInterface> {
    const existsPost = await this.postAccessRepository.findById(postId);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION.NOT_FOUND);
    }

    const { createdAt, publishedAt, updatedAt, id, ...newPost } = existsPost;

    newPost.userId = userId;
    newPost.repostedFromPostId = postId;

    return this.postAccessRepository.save(new PostAccessEntity(newPost));
  }

  public async updatePostById(post: UpdateCommonPostInterface): Promise<PostAccessEntity> {
    const existsPost = await this.postAccessRepository.findById(post.id);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION.NOT_FOUND);
    }

    return await this.postAccessRepository.updateAndReturn(post);
  }

  public async deletePostById(id: string): Promise<void> {
    await this.postAccessRepository.deleteById(id);
  }
}
