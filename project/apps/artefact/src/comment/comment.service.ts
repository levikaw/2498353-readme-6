import { Injectable } from '@nestjs/common';
import { CommentAccessEntity, CommentAccessRepository, Commentary } from '@project/comment-access';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentAccessRepository: CommentAccessRepository) {}

  /**
   * Получение комментариев по идентификатору публикации
   * @param {string} postId
   * @returns {Promise<Commentary[]>}
   */
  public async find(postId: string): Promise<Commentary[]> {
    return (await this.commentAccessRepository.findByPostId(postId)).map((c) => c.toObject());
  }

  /**
   * Создание комментария для публикации
   * @param {CreateCommentDto} dto
   * @param {string} postId
   * @returns {Promise<any>}
   */
  public async create(dto: CreateCommentDto, postId: string): Promise<Commentary> {
    return (await this.commentAccessRepository.save(new CommentAccessEntity({ ...dto, postId }))).toObject();
  }

  /**
   * Удаление комментария по идентификатору
   * @param {string} id
   */
  public async delete(id: string): Promise<any> {
    await this.commentAccessRepository.deleteById(id);
  }
}
