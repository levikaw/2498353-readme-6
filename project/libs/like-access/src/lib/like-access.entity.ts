import { BaseEntity, StorableEntity } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { UserLike } from './types/like.interface';

export class LikeAccessEntity extends BaseEntity implements StorableEntity<UserLike> {
  constructor(like: UserLike) {
    super();

    if (!isNotEmpty(like)) {
      return undefined;
    }

    this.id = like.id;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;

    this.postId = like.postId;
    this.userId = like.userId;
  }

  public postId: string;
  public userId: string;

  public toObject(): UserLike {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
