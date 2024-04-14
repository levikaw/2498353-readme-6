import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { CommentAccessEntity } from './comment-access.entity';
import { Commentary } from './types/comment.interface';

@Injectable()
export class CommentAccessFactory implements EntityFactory<CommentAccessEntity> {
  public createEntity(entityPlainData: Commentary): CommentAccessEntity {
    return new CommentAccessEntity(entityPlainData);
  }
}
