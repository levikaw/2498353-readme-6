import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { AuthUser } from './types/auth-user.interface';
import { UserAccessEntity } from './user-access.entity';

@Injectable()
export class UserAccessFactory implements EntityFactory<UserAccessEntity> {
  public createEntity(entityPlainData: AuthUser): UserAccessEntity {
    return new UserAccessEntity(entityPlainData);
  }
}
