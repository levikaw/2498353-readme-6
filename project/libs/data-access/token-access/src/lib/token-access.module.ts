import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getPostgresOptions } from '@project/configuration';
import { PrismaModule } from '@project/prisma';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { TokenService } from './token.service';
import { TokenAccessRepository } from './token-access.repository';
import { TokenAccessFactory } from './token-access.factory';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    PrismaModule.registerAsync(getPostgresOptions()),
  ],
  providers: [TokenService, JwtAccessStrategy, JwtRefreshStrategy, TokenAccessFactory, TokenAccessRepository],
  exports: [TokenService, JwtAccessStrategy, JwtRefreshStrategy, TokenAccessRepository],
})
export class TokenAccessModule {}
