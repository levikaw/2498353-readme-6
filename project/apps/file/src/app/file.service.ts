import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileAccessEntity, FileAccessRepository, UserFile } from '@project/file-access';
import { FILES_MESSAGES_EXCEPTION } from './constants';
import { FILES_ALIAS } from '@project/configuration';
import { join } from 'node:path';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository, private readonly configService: ConfigService) {}

  public buildPathForFile(userId: string): string {
    const rootPath = this.configService.get<string>(`${FILES_ALIAS}.rootPath`);
    return join(rootPath, userId);
  }

  public async upload(files: Express.Multer.File[], userId: string): Promise<string[]> {
    return Promise.all(
      files.map((file) =>
        this.fileAccessRepository
          .save(
            new FileAccessEntity({
              name: file.originalname,
              mimetype: file.mimetype,
              size: file.size,
              userId,
            }),
          )
          .then((resp) => {
            this.fileAccessRepository.saveContent(resp.id, this.buildPathForFile(userId), file);
            return resp.id;
          }),
      ),
    );
  }

  public async getFile(id: string): Promise<UserFile> {
    const file = await this.fileAccessRepository.findById(id);

    if (!file) {
      throw new Error(FILES_MESSAGES_EXCEPTION.NOT_FOUND);
    }

    return file.toObject();
  }
}
