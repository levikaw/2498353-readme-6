import { BaseEntity, StorableEntity } from '@project/core';
import { UserLike } from './types/like.interface';

export class LikeAccessEntity extends BaseEntity implements StorableEntity<UserLike> {
  constructor(comment?: UserLike) {
    super();
    this.populate(comment);
  }

  /** Идентификатор публиции, под которой оставили лайк */
  public postId: string;

  /** Идентификатор автора лайка */
  public userId: string;

  public populate(comment?: UserLike): void {
    if (!comment) {
      return;
    }

    this.id = comment.id;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.deletedAt = comment.deletedAt;

    this.postId = comment.postId;
    this.userId = comment.userId;
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
