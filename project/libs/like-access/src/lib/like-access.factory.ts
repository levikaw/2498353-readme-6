import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { LikeAccessEntity } from './like-access.entity';
import { UserLike } from './types/like.interface';

@Injectable()
export class LikeAccessFactory implements EntityFactory<LikeAccessEntity> {
  /**
   * Создание LikeAccessEntity из обекта
   * @param {UserLike} entityPlainData
   * @returns {LikeAccessEntity}
   */
  public create(entityPlainData: UserLike): LikeAccessEntity {
    return new LikeAccessEntity(entityPlainData);
  }
}
