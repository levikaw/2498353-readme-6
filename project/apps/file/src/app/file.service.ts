import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserFile } from '@project/file-access';
import { FileAccessEntity, FileAccessRepository } from '@project/file-access';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository) {}

  /**
   * Загрузка файлов
   * @param {Express.Multer.File[]} files
   * @returns {Promise<FileAccessEntity>}
   */
  public async upload(files: Express.Multer.File[], userId: string): Promise<string[]> {
    const uploadedFiles: string[] = [];
    for (const file of files) {
      const fileEntity = new FileAccessEntity({ name: file.originalname, content: file.buffer.toString(), userId });
      const processedFile = await this.fileAccessRepository.save(fileEntity);
      uploadedFiles.push(processedFile.id);
    }

    return uploadedFiles;
  }

  /**
   * Получение файла по идентификатору
   * @param {string} id
   * @returns {Promise<FileAccessEntity>}
   */
  public async download(id: string): Promise<UserFile> {
    const file = await this.fileAccessRepository.findById(id);

    if (!file) {
      Logger.error('File with id does not exists:', id);
      throw new Error('File does not exists');
    }

    return file.toObject();
  }
}
