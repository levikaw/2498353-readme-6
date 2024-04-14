import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { FileAccessEntity } from './file-access.entity';
import { UserFile } from './types/file.interface';

@Injectable()
export class FileAccessFactory implements EntityFactory<FileAccessEntity> {
  public createEntity(entityPlainData: UserFile): FileAccessEntity {
    return new FileAccessEntity(entityPlainData);
  }
}
