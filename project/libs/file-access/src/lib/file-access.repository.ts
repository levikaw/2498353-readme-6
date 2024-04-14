import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/data-access';
import { Model } from 'mongoose';
import { FileAccessEntity } from './file-access.entity';
import { FileAccessFactory } from './file-access.factory';
import { FileAccessModel } from './file-access.model';

@Injectable()
export class FileAccessRepository extends BaseMongoRepository<FileAccessEntity, FileAccessModel> {
  constructor(entityFactory: FileAccessFactory, @InjectModel(FileAccessModel.name) fileAccessModel: Model<FileAccessModel>) {
    super(entityFactory, fileAccessModel);
  }
}
