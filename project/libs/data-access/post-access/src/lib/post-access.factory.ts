import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { PostAccessEntity } from './post-access.entity';
import { CommonPost } from './types/common-post.interface';

@Injectable()
export class PostAccessFactory implements EntityFactory<PostAccessEntity> {
  public createEntity(entityPlainData: CommonPost): PostAccessEntity {
    return isNotEmpty(entityPlainData) ? new PostAccessEntity(entityPlainData) : null;
  }
}
