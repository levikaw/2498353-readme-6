import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { FileAccessEntity } from './file-access.entity';
import { FileInterface } from './types/file.interface';

@Injectable()
export class FileAccessFactory implements EntityFactoryInterface<FileAccessEntity> {
  public createEntity(entityPlainData: FileInterface): FileAccessEntity {
    return new FileAccessEntity(entityPlainData);
  }
}
