import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getRabbitOptions, postgresRegister, userServiceRegister, rabbitRegister } from '@project/configuration';
import { PrismaDataAccessModule } from '@project/core';
import { UserAccessFactory, UserAccessRepository } from '@project/user-access';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [userServiceRegister, postgresRegister, rabbitRegister],
      envFilePath: 'apps/user/.env',
    }),
    PrismaDataAccessModule.register(UserAccessFactory, UserAccessRepository),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitOptions()),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
