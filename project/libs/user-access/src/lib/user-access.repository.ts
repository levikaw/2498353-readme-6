import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { UserAccessEntity } from './user-access.entity';
import { UserAccessFactory } from './user-access.factory';

@Injectable()
export class UserAccessRepository extends BaseMemoryRepository<UserAccessEntity> {
  constructor(entityFactory: UserAccessFactory) {
    super(entityFactory);
  }

  /**
   * Поиск пользователя по email
   * @param {string} email
   * @returns {Promise<UserAccessEntity>}
   */
  public async findByEmail(email: string): Promise<UserAccessEntity> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email && !entity.deletedAt);
    return !!user ? this.entityFactory.create(user) : null;
  }
}
