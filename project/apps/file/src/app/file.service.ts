import { Injectable } from '@nestjs/common';
import { FileAccessEntity, FileAccessRepository } from '@project/file-access';
import { FILES_MESSAGES_EXCEPTION } from './constants';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository) {}

  public async upload(files: Express.Multer.File[], userId: string): Promise<string[]> {
    return await Promise.all(
      files.map(async (file) => {
        const fileEntity = new FileAccessEntity({ name: file.originalname, content: file.buffer.toString('base64'), userId });
        const processedFile = await this.fileAccessRepository.save(fileEntity);
        return processedFile.id;
      }),
    );
  }

  public async download(id: string): Promise<Buffer> {
    const file = await this.fileAccessRepository.findById(id);

    if (!file) {
      throw new Error(FILES_MESSAGES_EXCEPTION.NotFound);
    }

    return Buffer.from(file.content);
  }
}
