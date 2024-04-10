import { BaseEntity, StorableEntity } from '@project/core';
import { Commentary } from './types/comment.interface';

export class CommentAccessEntity extends BaseEntity implements StorableEntity<Commentary> {
  constructor(comment?: Commentary) {
    super();
    this.populate(comment);
  }

  public text: string;

  public postId: string;

  public userId: string;

  public populate(comment?: Commentary): void {
    if (!comment) {
      return;
    }

    this.id = comment.id;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.deletedAt = comment.deletedAt;

    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }

  public toObject(): Commentary {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      text: this.text,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
