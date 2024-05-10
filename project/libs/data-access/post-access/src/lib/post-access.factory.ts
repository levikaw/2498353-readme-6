import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { PostAccessEntity } from './post-access.entity';
import { CommonPostInterface } from './types/common-post.interface';

@Injectable()
export class PostAccessFactory implements EntityFactoryInterface<PostAccessEntity> {
  public createEntity(entityPlainData: CommonPostInterface): PostAccessEntity {
    return isNotEmpty(entityPlainData) ? new PostAccessEntity(entityPlainData) : null;
  }
}
