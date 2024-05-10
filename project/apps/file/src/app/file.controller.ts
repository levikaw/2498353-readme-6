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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { MAX_FILE_SIZE, MAX_AVATAR_SIZE, ALLOWED_FILE_TYPES } from '@project/constants/file-constant';
import 'multer';
import { CurrentUserFromToken, JwtAuthGuard } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { FilePathWithEntityIdDto, QueryFileDto } from '@project/dtos/file-dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse({
    type: String,
    isArray: false,
    description: 'Get uploaded file identificator',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_FILE_SIZE,
      },
    }),
  )
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<string> {
    try {
      return await this.fileService.upload(file, user.userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot upload avatar', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({
    type: String,
    isArray: false,
    description: 'Get uploaded file identificator',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_AVATAR_SIZE,
      },
    }),
  )
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('avatar/:userId')
  public async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<string> {
    try {
      return await this.fileService.upload(file, userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot upload avatar', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({
    type: [FilePathWithEntityIdDto],
    isArray: true,
    description: 'get files paths with entiti id (for example, user or post)',
  })
  @Get()
  @ApiQuery({
    required: true,
    type: QueryFileDto,
  })
  public async getFilesPaths(@Query() params: QueryFileDto): Promise<FilePathWithEntityIdDto[]> {
    try {
      return await Promise.all(
        params.filter.map((param) => this.fileService.getFilePath(param.fileId).then((filePath) => ({ id: param.id, filePath }))),
      );
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }
}
