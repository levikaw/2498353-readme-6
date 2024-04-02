import { Injectable } from '@nestjs/common';
import { AuthUser, EntityFactory } from '@project/core';
import { UserAccountEntity } from './user-account.entity';

@Injectable()
export class UserAccountFactory implements EntityFactory<UserAccountEntity> {
  /**
   * Создание UserAccountEntity из обекта
   * @param {AuthUser} entityPlainData
   * @returns {UserAccountEntity}
   */
  public create(entityPlainData: AuthUser): UserAccountEntity {
    return new UserAccountEntity(entityPlainData);
  }
}
