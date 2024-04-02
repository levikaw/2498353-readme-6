import { Module } from '@nestjs/common';
import { FileAccessRepository } from './file-access.repository';
import { FileAccessFactory } from './file-access.factory';

@Module({
  providers: [FileAccessRepository, FileAccessFactory],
  exports: [FileAccessRepository],
})
export class FileAccessModule {}
