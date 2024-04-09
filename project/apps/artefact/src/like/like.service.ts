import { Injectable } from '@nestjs/common';
import { LikeAccessEntity, LikeAccessRepository, UserLike } from '@project/like-access';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeAccessRepository: LikeAccessRepository) {}

  /**
   * Получение комментариев по идентификатору публикации
   * @param {string} postId
   * @returns {Promise<UserLike[]>}
   */
  public async find(postId: string): Promise<UserLike[]> {
    return (await this.likeAccessRepository.findByPostId(postId)).map((c) => c.toObject());
  }

  /**
   * Создание комментария для публикации
   * @param {CreateLikeDto} dto
   * @returns {Promise<UserLike>}
   */
  public async create(dto: CreateLikeDto): Promise<UserLike> {
    // TODO: Проверка при создании лайка (может быть только один лайк пользователя для публикации)
    return (await this.likeAccessRepository.save(new LikeAccessEntity(dto))).toObject();
  }

  /**
   * Удаление комментария по идентификатору публикации и пользователя
   * @param {string} postId
   * @param {string} userId
   */
  public async delete(postId: string, userId: string): Promise<any> {
    const like = await this.likeAccessRepository.findByPostIdUserId(postId, userId);
    if (!like) {
      throw new Error('Оценка публикации не найдена!');
    }

    await this.likeAccessRepository.deleteById(like.toObject().id);
  }
}
