import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileAccessEntity } from '@project/file-access';
import { FileService } from './file.service';
import { MAX_FILE_SIZE, MAX_AVATAR_SIZE } from '@project/constants';
import { UserFile } from '@project/file-access';
import 'multer';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Загрузка файлов с ограничением в 1000 кб
   * @param {Express.Multer.File[]} files
   * @param {string} userId
   * @returns
   */
  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload/:userId')
  public async upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Param('userId') userId: string,
  ): Promise<{ filesId: string[] }> {
    const newFiles = await this.fileService.upload(files, userId);
    return { filesId: newFiles };
  }

  /**
   * Загрузка аватара с ограничением в 500 кб
   * @param {Express.Multer.File[]} files
   * @param {string} userId
   * @returns
   */
  @UseInterceptors(FilesInterceptor('files'))
  @Post('avatar/:userId')
  public async avatar(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_SIZE }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Param('userId') userId: string,
  ): Promise<{ filesId: string[] }> {
    const newFiles = await this.fileService.upload(files, userId);
    return { filesId: newFiles };
  }

  /**
   * Получение файла по идентификатору
   * @param {string} id
   * @returns {Promise<FileAccessEntity>}
   */
  @ApiOkResponse({ type: FileAccessEntity })
  @Get('download/:id')
  public async download(@Param('id') id: string): Promise<UserFile> {
    return await this.fileService.download(id);
  }
}
