import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FileAccessEntity, FileAccessRepository } from '@project/file-access';

@Injectable()
export class FileService {
  constructor(private readonly fileAccessRepository: FileAccessRepository) {}

  /**
   * Загрузка файла
   * @param {any} file
   * @returns {Promise<FileAccessEntity>}
   */
  public async upload(file: any, userId: string): Promise<FileAccessEntity> {
    const fileEntity = new FileAccessEntity(file);

    this.fileAccessRepository.create(fileEntity);

    // TODO: link file user

    return fileEntity;
  }

  /**
   * Получение файла по идентификатору
   * @param {string} id
   * @returns {Promise<FileAccessEntity>}
   */
  public async download(id: string): Promise<FileAccessEntity> {
    const file = this.fileAccessRepository.findById(id);

    if (!file) {
      Logger.error('File with id does not exists:', id);
      throw new Error('File does not exists');
    }

    return file;
  }
}
