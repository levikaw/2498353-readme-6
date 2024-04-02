import { Injectable } from '@nestjs/common';
import { EntityFactory, UserFile } from '@project/core';
import { FileAccessEntity } from './file-access.entity';

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
