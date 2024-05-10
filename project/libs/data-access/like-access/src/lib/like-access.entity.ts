import { BaseEntity, StorableEntityInterface } from '@project/core';
import { LikeInterface } from './types/like.interface';

export class LikeAccessEntity extends BaseEntity implements StorableEntityInterface<LikeInterface> {
  constructor(like: LikeInterface) {
    super();

    this.id = like.id;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;

    this.postId = like.postId;
    this.userId = like.userId;
  }

  public postId: string;
  public userId: string;

  public toObject(): LikeInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
