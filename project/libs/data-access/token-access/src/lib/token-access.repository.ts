import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { TokenAccessEntity } from './token-access.entity';
import { TokenAccessFactory } from './token-access.factory';

@Injectable()
export class TokenAccessRepository extends BasePostgresRepository<TokenAccessEntity> {
  constructor(entityFactory: TokenAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async setRefreshToken(userId: string, refreshToken: string, expiredAt: Date): Promise<void> {
    await this.dataSource.refreshToken.upsert({
      where: { userId },
      update: {
        id: refreshToken,
        expiredAt,
      },
      create: {
        id: refreshToken,
        expiredAt,
        userId,
      },
    });
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.dataSource.refreshToken.deleteMany({
      where: { expiredAt: { lt: new Date() } },
    });
  }

  public async findByUserId(userId: string): Promise<TokenAccessEntity> {
    return this.dataSource.refreshToken
      .findUnique({
        where: {
          userId,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }
}
