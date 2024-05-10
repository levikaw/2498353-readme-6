import { BaseEntity, StorableEntityInterface } from '@project/core';
import { LinkPostTagInterface } from '../types/link-post-tag.interface';

export class LinkPostTagAccessEntity extends BaseEntity implements StorableEntityInterface<LinkPostTagInterface> {
  constructor(tag: LinkPostTagInterface) {
    super();

    this.id = tag.id;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;

    this.postId = tag.postId;
    this.tagId = tag.tagId;
  }

  public postId: string;
  public tagId: string;

  public toObject(): LinkPostTagInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      tagId: this.tagId,
    };
  }
}
