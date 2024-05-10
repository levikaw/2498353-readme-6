import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { TokenAccessEntity } from './token-access.entity';
import { isNotEmpty } from 'class-validator';
import { RefreshTokenInterface } from './types/refresh-token.interface';

@Injectable()
export class TokenAccessFactory implements EntityFactoryInterface<TokenAccessEntity> {
  public createEntity(entityPlainData: RefreshTokenInterface): TokenAccessEntity {
    return isNotEmpty(entityPlainData) ? new TokenAccessEntity(entityPlainData) : null;
  }
}
