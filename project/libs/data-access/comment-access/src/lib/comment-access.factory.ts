import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { CommentAccessEntity } from './comment-access.entity';
import { Commentary } from './types/comment.interface';

@Injectable()
export class CommentAccessFactory implements EntityFactory<CommentAccessEntity> {
  public createEntity(entityPlainData: Commentary): CommentAccessEntity {
    return isNotEmpty(entityPlainData) ? new CommentAccessEntity(entityPlainData) : null;
  }
}
