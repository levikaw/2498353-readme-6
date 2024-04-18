import { Module } from '@nestjs/common';
import { FileAccessRepository } from './file-access.repository';
import { FileAccessFactory } from './file-access.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { FileAccessModel, fileAccessSchema } from './file-access.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileAccessModel.name, schema: fileAccessSchema }])],
  providers: [FileAccessRepository, FileAccessFactory],
  exports: [FileAccessRepository],
})
export class FileAccessModule {}
