import { BaseEntity } from '@project/core';
import { StorableEntityInterface } from '@project/core';
import { FileInterface } from './types/file.interface';

export class FileAccessEntity extends BaseEntity implements StorableEntityInterface<FileInterface> {
  constructor(file: FileInterface) {
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

  public toObject(): FileInterface {
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
