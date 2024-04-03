import { BaseEntity, StorableEntity } from '@project/core';
import { UserLike } from './types/like.interface';

export class LikeAccessEntity extends BaseEntity implements StorableEntity<UserLike> {
  constructor(like?: UserLike) {
    super();
    this.populate(like);
  }

  /** Идентификатор публиции, под которой оставили лайк */
  public postId: string;

  /** Идентификатор автора лайка */
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

  /**
   * Преобразование из LikeAccessEntity в объект
   * @returns {UserLike}
   */
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
