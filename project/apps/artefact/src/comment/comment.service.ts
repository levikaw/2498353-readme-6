import { Injectable } from '@nestjs/common';
import { CommentAccessEntity, CommentAccessRepository, CommentInterface } from '@project/comment-access';

@Injectable()
export class CommentService {
  constructor(private readonly commentAccessRepository: CommentAccessRepository) {}

  public async findCommentsByPostId(postId: string, page: number): Promise<CommentInterface[]> {
    return this.commentAccessRepository.findManyByPostId(postId, page);
  }

  public async countByPostId(postId: string): Promise<number> {
    return this.commentAccessRepository.countByPostId(postId);
  }

  public async createCommentByPostId(text: string, postId: string, userId: string): Promise<CommentInterface> {
    return this.commentAccessRepository.save(new CommentAccessEntity({ text, postId, userId }));
  }

  public async deleteCommentById(id: string): Promise<void> {
    await this.commentAccessRepository.deleteById(id);
  }

  public async findCommentById(id: string): Promise<CommentAccessEntity> {
    return this.commentAccessRepository.findById(id);
  }
}
