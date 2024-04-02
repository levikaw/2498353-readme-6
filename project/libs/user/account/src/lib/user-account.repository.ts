import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { UserAccountEntity } from './user-account.entity';
import { UserAccountFactory } from './user-account.factory';

@Injectable()
export class UserAccountRepository extends BaseMemoryRepository<UserAccountEntity> {
  constructor(entityFactory: UserAccountFactory) {
    super(entityFactory);
  }

  /**
   * Поиск пользователя по email
   * @param {string} email
   * @returns {Promise<UserAccountEntity>}
   */
  public async findByEmail(email: string): Promise<UserAccountEntity> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return !!user ? this.entityFactory.create(user) : null;
  }
}
