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

  public populate(file?: UserFile): void {
    if (!file) {
      return;
    }

    this.id = this.id ?? '';
    this.name = file.name;
    this.content = file.content;
  }

  /**
   * Преобразование из FileAccessEntity в объект
   * @returns {UserFile}
   */
  public toObject(): UserFile {
    return Object.assign({}, this);
  }
}
