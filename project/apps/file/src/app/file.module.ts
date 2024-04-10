import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileAccessModule } from '@project/file-access';
import { FileModuleConfig } from './file-service.config.module';

@Module({
  imports: [FileAccessModule, FileModuleConfig],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
