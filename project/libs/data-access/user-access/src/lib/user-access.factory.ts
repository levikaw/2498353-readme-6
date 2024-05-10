import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { AuthUserInterface } from './types/auth-user.interface';
import { UserAccessEntity } from './user-access.entity';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserAccessFactory implements EntityFactoryInterface<UserAccessEntity> {
  public createEntity(entityPlainData: AuthUserInterface): UserAccessEntity {
    return isNotEmpty(entityPlainData) ? new UserAccessEntity(entityPlainData) : null;
  }
}
