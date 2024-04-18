import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { LikeAccessEntity } from './like-access.entity';
import { UserLike } from './types/like.interface';

@Injectable()
export class LikeAccessFactory implements EntityFactory<LikeAccessEntity> {
  public createEntity(entityPlainData: UserLike): LikeAccessEntity {
    return isNotEmpty(entityPlainData) ? new LikeAccessEntity(entityPlainData) : null;
  }
}
