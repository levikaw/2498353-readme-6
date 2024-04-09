import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { FileAccessEntity } from './file-access.entity';
import { UserFile } from './types/file.interface';

@Injectable()
export class FileAccessFactory implements EntityFactory<FileAccessEntity> {
  /**
   * Создание FileAccessEntity из обекта
   * @param {UserFile} entityPlainData
   * @returns {FileAccessEntity}
   */
  public create(entityPlainData: UserFile): FileAccessEntity {
    return new FileAccessEntity(entityPlainData);
  }
}
