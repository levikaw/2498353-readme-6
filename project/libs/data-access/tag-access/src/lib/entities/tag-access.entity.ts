import { BaseEntity, StorableEntityInterface } from '@project/core';
import { TagInterface } from '../types/tag.interface';

export class TagAccessEntity extends BaseEntity implements StorableEntityInterface<TagInterface> {
  constructor(tag: TagInterface) {
    super();

    this.id = tag.id;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
    this.name = tag.name.toLowerCase();
  }

  public name: string;

  public toObject(): TagInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name.toLowerCase(),
    };
  }
}
