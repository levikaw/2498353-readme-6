import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileAccessEntity, FileAccessRepository } from '@project/file-access';
import { FILES_EXCEPTION } from '@project/constants/exception-messages';
import { FILES_ALIAS, BAD_MONGO_ID_ERROR } from '@project/configuration';
import { join } from 'node:path';
import { extension } from 'mime-types';
import { Types } from 'mongoose';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository, private readonly configService: ConfigService) {}

  public buildPathForFile(userId: string): string {
    const rootPath = this.configService.get<string>(`${FILES_ALIAS}.rootPath`);
    return join(rootPath, userId);
  }

  public async upload(file: Express.Multer.File, userId: string): Promise<string> {
    return this.fileAccessRepository
      .save(
        new FileAccessEntity({
          name: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          userId,
        }),
      )
      .then(({ id }) => this.fileAccessRepository.saveContent(id, this.buildPathForFile(userId), file));
  }

  public async getFilePath(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    const fileEntity = await this.fileAccessRepository.findById(id);

    if (!fileEntity) {
      throw new Error(FILES_EXCEPTION.NOT_FOUND);
    }
    return join(
      this.configService.get<string>(`${FILES_ALIAS}.serveRoot`),
      fileEntity.userId,
      `${id}.${extension(fileEntity.mimetype)}`,
    );
  }
}
