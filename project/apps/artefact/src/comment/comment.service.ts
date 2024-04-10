import { Injectable } from '@nestjs/common';
import { CommentAccessEntity, CommentAccessRepository, Commentary } from '@project/comment-access';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentAccessRepository: CommentAccessRepository) {}

  public async findCommentByPostId(postId: string): Promise<Commentary[]> {
    return (await this.commentAccessRepository.findCommentByPostId(postId)).map((c) => c.toObject());
  }

  public async createCommentByPostId(comment: CreateCommentDto, postId: string): Promise<Commentary> {
    return (await this.commentAccessRepository.save(new CommentAccessEntity({ ...comment, postId }))).toObject();
  }

  public async deleteCommentById(id: string): Promise<any> {
    await this.commentAccessRepository.deleteById(id);
  }
}
