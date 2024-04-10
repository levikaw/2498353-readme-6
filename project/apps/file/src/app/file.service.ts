import { Injectable, Logger } from '@nestjs/common';
import { FileAccessEntity, FileAccessRepository } from '@project/file-access';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository) {}

  public async upload(files: Express.Multer.File[], userId: string): Promise<string[]> {
    const uploadedFiles: string[] = [];
    for (const file of files) {
      const fileEntity = new FileAccessEntity({ name: file.originalname, content: file.buffer.toString('base64'), userId });
      const processedFile = await this.fileAccessRepository.save(fileEntity);
      uploadedFiles.push(processedFile.id);
    }

    return uploadedFiles;
  }

  public async download(id: string): Promise<Buffer> {
    const file = await this.fileAccessRepository.findById(id);

    if (!file) {
      Logger.error('File with id does not exists:', id);
      throw new Error('File does not exists');
    }

    return Buffer.from(file.content);
  }
}
