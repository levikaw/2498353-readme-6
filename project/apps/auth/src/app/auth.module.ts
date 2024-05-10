import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserAccessFactory, UserAccessRepository } from '@project/user-access';
import { TokenAccessModule } from '@project/token-access';
import { authServiceRegister, postgresRegister } from '@project/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaDataAccessModule } from '@project/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authServiceRegister, postgresRegister],
      envFilePath: 'apps/auth/.env',
    }),
    TokenAccessModule,
    PrismaDataAccessModule.register([UserAccessFactory], [UserAccessRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
