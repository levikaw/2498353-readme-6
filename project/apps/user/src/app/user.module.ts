import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { postgresRegister, userServiceRegister } from '@project/configuration';
import { UserAccessModule } from '@project/user-access';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [userServiceRegister, postgresRegister],
      envFilePath: 'apps/user/.env',
    }),
    UserAccessModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
