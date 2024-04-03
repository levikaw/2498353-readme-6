import { BaseEntity, UserFile } from '@project/core';
import { StorableEntity } from '@project/core';

export class FileAccessEntity extends BaseEntity implements StorableEntity<UserFile> {
  constructor(file?: UserFile) {
    super();
    this.populate(file);
  }

  /** Имя файла */
  public name: string;

  /** Содержание */
  public content: string;

  /** Пользователь, который загрузил файл */
  public userId: string;

  public populate(file?: UserFile): void {
    if (!file) {
      return;
    }

    this.id = file.id;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
    this.deletedAt = file.deletedAt;

    this.name = file.name;
    this.content = file.content;
    this.userId = file.userId;
  }

  /**
   * Преобразование из FileAccessEntity в объект
   * @returns {UserFile}
   */
  public toObject(): UserFile {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      name: this.name,
      content: this.content,
      userId: this.userId,
    };
  }
}
