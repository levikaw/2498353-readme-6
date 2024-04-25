import { BaseEntity } from '@project/core';
import { StorableEntity } from '@project/core';
import { UserFile } from './types/file.interface';

export class FileAccessEntity extends BaseEntity implements StorableEntity<UserFile> {
  constructor(file: UserFile) {
    super();
    this.id = file.id;
    this.createdAt = file.createdAt;

    this.size = file.size;
    this.mimetype = file.mimetype;
    this.name = file.name;
    this.userId = file.userId;
  }

  public name: string;
  public userId: string;
  public mimetype: string;
  public size: number;

  public toObject(): UserFile {
    return {
      id: this.id,
      createdAt: this.createdAt,
      name: this.name,
      userId: this.userId,
      mimetype: this.mimetype,
      size: this.size,
    };
  }
}
