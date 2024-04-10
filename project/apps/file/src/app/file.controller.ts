import {
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { MAX_FILE_SIZE, MAX_AVATAR_SIZE, ALLOWED_FILE_TYPES } from './constants';
import 'multer';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: '{ filesId: string[] }',
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload/:userId')
  public async upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Param('userId') userId: string,
  ): Promise<{ filesId: string[] }> {
    const newFiles = await this.fileService.upload(files, userId);
    return { filesId: newFiles };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: '{ filesId: string[] }',
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @UseInterceptors(FilesInterceptor('files'))
  @Post('avatar/:userId')
  public async uploadAvatar(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Param('userId') userId: string,
  ): Promise<{ filesId: string[] }> {
    const newFiles = await this.fileService.upload(files, userId);
    return { filesId: newFiles };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: Buffer,
    isArray: false,
  })
  @Get('download/:id')
  public async download(@Param('id') id: string): Promise<Buffer> {
    return await this.fileService.download(id);
  }
}
