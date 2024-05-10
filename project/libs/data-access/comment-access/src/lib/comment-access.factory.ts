import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentInterface } from './types/comment.interface';

@Injectable()
export class CommentAccessFactory implements EntityFactoryInterface<CommentAccessEntity> {
  public createEntity(entityPlainData: CommentInterface): CommentAccessEntity {
    return isNotEmpty(entityPlainData) ? new CommentAccessEntity(entityPlainData) : null;
  }
}
