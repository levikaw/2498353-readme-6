import { Injectable } from '@nestjs/common';
import { AuthUser, EntityFactory } from '@project/core';
import { UserAccessEntity } from './user-access.entity';

@Injectable()
export class UserAccessFactory implements EntityFactory<UserAccessEntity> {
  /**
   * Создание UserAccessEntity из обекта
   * @param {AuthUser} entityPlainData
   * @returns {UserAccessEntity}
   */
  public create(entityPlainData: AuthUser): UserAccessEntity {
    return new UserAccessEntity(entityPlainData);
  }
}
