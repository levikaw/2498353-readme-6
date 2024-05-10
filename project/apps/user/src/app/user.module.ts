import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  getRabbitOptions,
  postgresRegister,
  userServiceRegister,
  rabbitRegister,
  authServiceRegister,
} from '@project/configuration';
import { PrismaDataAccessModule } from '@project/prisma';
import { UserAccessFactory, UserAccessRepository } from '@project/user-access';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenAccessModule } from '@project/token-access';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [userServiceRegister, postgresRegister, rabbitRegister, authServiceRegister],
      envFilePath: 'apps/user/.env',
    }),
    TokenAccessModule,
    PrismaDataAccessModule.register([UserAccessFactory], [UserAccessRepository]),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitOptions()),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
