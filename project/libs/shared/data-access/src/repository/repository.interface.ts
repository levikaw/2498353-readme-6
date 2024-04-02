import { BaseEntity } from '@project/core';

export interface Repository<T extends BaseEntity> {
  /**
   * Поиск entity по id
   * @param {T['id']} id
   * @returns {Promise<T>}
   */
  findById(id: T['id']): Promise<T>;

  /**
   * Создание entity
   * @param {T} entity
   * @returns {Promise<T>}
   */
  create(entity: T): Promise<T>;

  /**
   * Обновление entity
   * @param {T} entity
   */
  update(entity: T): Promise<void>;

  /**
   * Удаление entity по id
   * @param {T['id']} id
   */
  deleteById(id: T['id']): Promise<void>;
}
