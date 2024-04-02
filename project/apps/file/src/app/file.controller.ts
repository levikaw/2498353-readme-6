import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileAccessEntity } from '@project/file-access';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @ApiOkResponse({ type: UserAccountEntity })
  @UseInterceptors(FilesInterceptor('file'))
  @Post('upload')
  public async upload(@UploadedFiles() file: Express.Multer.File): Promise<any /*{ fileId: string }*/> {
    console.log(file);
    // const dto: any = {}; @Body() dto: any
    // const newFile = await this.fileService.upload(dto.file, dto.userId);
    // return { fileId: newFile.id };
  }

  @ApiOkResponse({ type: FileAccessEntity })
  @Get('download/:id')
  public async download(@Param('id') id: string): Promise<FileAccessEntity> {
    return await this.fileService.download(id);
  }
}
