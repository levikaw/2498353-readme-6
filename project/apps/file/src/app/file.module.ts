import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileAccessModule } from '@project/file-access';

@Module({
  imports: [FileAccessModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
