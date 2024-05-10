import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { LikeAccessEntity } from './like-access.entity';
import { LikeInterface } from './types/like.interface';

@Injectable()
export class LikeAccessFactory implements EntityFactoryInterface<LikeAccessEntity> {
  public createEntity(entityPlainData: LikeInterface): LikeAccessEntity {
    return isNotEmpty(entityPlainData) ? new LikeAccessEntity(entityPlainData) : null;
  }
}
