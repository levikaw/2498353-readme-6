import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserAccessModule } from '@project/user-access';
import { authServiceRegister, getJwtOptions } from '@project/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ENV_FILE } from '@project/prisma';

@Module({
  imports: [
    UserAccessModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authServiceRegister],
      envFilePath: ENV_FILE,
    }),
    JwtModule.registerAsync(getJwtOptions()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
