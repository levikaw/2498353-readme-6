import { Injectable } from '@nestjs/common';
import { QueryParamsDto } from '@project/common';
import { PostAccessEntity, PostAccessRepository, CommonPost } from '@project/post-access';
import { UpdateCommonnPost } from '@project/post-access';
import { POST_EXCEPTION_MESSAGES } from './constants';

@Injectable()
export class PostService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  public async createPost(post: CommonPost): Promise<PostAccessEntity> {
    return this.postAccessRepository.save(new PostAccessEntity(post));
  }

  public async findPosts(params?: QueryParamsDto<CommonPost>): Promise<CommonPost[]> {
    return this.postAccessRepository.findManyBy(params).then((resp) => resp.map((post) => post.toObject()));
  }

  public async countBy(where?: QueryParamsDto<CommonPost>['filter']): Promise<number> {
    return this.postAccessRepository.countBy(where);
  }

  public async findPostById(id: string): Promise<CommonPost> {
    return this.postAccessRepository.findById(id).then((resp) => resp?.toObject());
  }

  public async rePost(postId: string, userId: string): Promise<CommonPost> {
    const existsPost = await this.postAccessRepository.findById(postId);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    const newPost = (({ createdAt, publishedAt, updatedAt, id, ...post }) => post)(existsPost);

    newPost.userId = userId;
    newPost.repostedFromPostId = postId;

    return this.postAccessRepository.save(new PostAccessEntity(newPost)).then((resp) => resp.toObject());
  }

  // TODO: обновление репоста?
  public async updatePostById(post: UpdateCommonnPost): Promise<void> {
    const existsPost = await this.postAccessRepository.findById(post.id);

    if (!existsPost) {
      throw new Error(POST_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    // TODO: сделать проверку на userId
    await this.postAccessRepository.update(post);
  }

  public async deletePostById(id: string): Promise<void> {
    await this.postAccessRepository.deleteById(id);
  }
}
