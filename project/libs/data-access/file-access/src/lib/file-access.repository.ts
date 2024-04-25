import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/core';
import { Model } from 'mongoose';
import { FileAccessEntity } from './file-access.entity';
import { FileAccessFactory } from './file-access.factory';
import { FileAccessModel } from './file-access.model';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import { join } from 'node:path';
import 'multer';

@Injectable()
export class FileAccessRepository extends BaseMongoRepository<FileAccessEntity, FileAccessModel> {
  constructor(entityFactory: FileAccessFactory, @InjectModel(FileAccessModel.name) fileAccessModel: Model<FileAccessModel>) {
    super(entityFactory, fileAccessModel);
  }

  public async saveContent(id: string, dir: string, file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${id}.${extension(file.mimetype)}`;
      const path = join(dir, fileName);

      await ensureDir(dir);
      await writeFile(path, file.buffer);

      return fileName;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }
}
