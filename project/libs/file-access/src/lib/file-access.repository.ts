import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { FileAccessEntity } from './file-access.entity';
import { FileAccessFactory } from './file-access.factory';

@Injectable()
export class FileAccessRepository extends BaseMemoryRepository<FileAccessEntity> {
  constructor(entityFactory: FileAccessFactory) {
    super(entityFactory);
  }
}
