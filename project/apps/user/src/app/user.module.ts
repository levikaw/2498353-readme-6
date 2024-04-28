import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getRabbitOptions, postgresRegister, userServiceRegister, rabbitRegister } from '@project/configuration';
import { UserAccessModule } from '@project/user-access';
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
    UserAccessModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitOptions()),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
