import { BaseEntity, StorableEntityInterface } from '@project/core';
import { CommentInterface } from './types/comment.interface';

export class CommentAccessEntity extends BaseEntity implements StorableEntityInterface<CommentInterface> {
  constructor(comment: CommentInterface) {
    super();

    this.id = comment.id;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;

    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }

  public text: string;
  public postId: string;
  public userId: string;

  public toObject(): CommentInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      text: this.text,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
