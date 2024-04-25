import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { MAX_FILE_SIZE, MAX_AVATAR_SIZE, ALLOWED_FILE_TYPES } from './constants';
import 'multer';
import { ParseMongoIdPipe } from '@project/configuration';
import { FileAccessEntity, UserFile } from '@project/file-access';

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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<{ filesId: string[] }> {
    try {
      const filesId = await this.fileService.upload(files, userId);
      return { filesId };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<{ filesId: string[] }> {
    try {
      const filesId = await this.fileService.upload(files, userId);
      return { filesId };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: FileAccessEntity,
    isArray: false,
  })
  @Get(':id')
  public async getFile(@Param('id', ParseMongoIdPipe) id: string): Promise<UserFile> {
    try {
      return await this.fileService.getFile(id);
    } catch (error) {
      Logger.error(error, `getFile - id: ${id}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
