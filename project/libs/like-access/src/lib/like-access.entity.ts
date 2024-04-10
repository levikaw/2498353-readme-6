import { BaseEntity, StorableEntity } from '@project/core';
import { UserLike } from './types/like.interface';

export class LikeAccessEntity extends BaseEntity implements StorableEntity<UserLike> {
  constructor(like?: UserLike) {
    super();
    this.populate(like);
  }

  public postId: string;
  public userId: string;

  public populate(like?: UserLike): void {
    if (!like) {
      return;
    }

    this.id = like.id;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;
    this.deletedAt = like.deletedAt;

    this.postId = like.postId;
    this.userId = like.userId;
  }

  public toObject(): UserLike {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
