import { BaseEntity } from '@project/core';
import { StorableEntity } from '@project/core';
import { UserFile } from './types/file.interface';

export class FileAccessEntity extends BaseEntity implements StorableEntity<UserFile> {
  constructor(file: UserFile) {
    super();
    this.id = file.id;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
    this.deletedAt = file.deletedAt;

    this.name = file.name;
    this.content = file.content;
    this.userId = file.userId;
  }

  public name: string;
  public content: string;
  public userId: string;

  public toObject(): UserFile {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      name: this.name,
      content: this.content,
      userId: this.userId,
    };
  }
}
