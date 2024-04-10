import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { PostAccessEntity } from './post-access.entity';
import { CommonPost } from './types/common-post.interface';

@Injectable()
export class PostAccessFactory implements EntityFactory<PostAccessEntity> {
  public createEntity(entityPlainData: CommonPost): PostAccessEntity {
    return new PostAccessEntity(entityPlainData);
  }
}
