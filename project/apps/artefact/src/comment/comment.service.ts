import { Injectable } from '@nestjs/common';
import { CommentAccessEntity, CommentAccessRepository, Commentary } from '@project/comment-access';
import { QueryParamsDto } from '@project/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentAccessRepository: CommentAccessRepository) {}

  public async findCommentsByPostId(params?: QueryParamsDto<Commentary>): Promise<Commentary[]> {
    return this.commentAccessRepository.findManyBy(params).then((resp) => resp.map((c) => c.toObject()));
  }

  public async countBy(where?: QueryParamsDto<Commentary>['filter']): Promise<number> {
    return this.commentAccessRepository.countBy(where);
  }

  public async createCommentByPostId(comment: CreateCommentDto, postId: string): Promise<Commentary> {
    return this.commentAccessRepository.save(new CommentAccessEntity({ ...comment, postId })).then((resp) => resp.toObject());
  }

  public async deleteCommentById(id: string): Promise<void> {
    await this.commentAccessRepository.deleteById(id);
  }
}
