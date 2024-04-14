import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserAccessModule } from '@project/user-access';
import { authServiceRegister, getJwtOptions } from '@project/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserAccessModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authServiceRegister],
      envFilePath: 'apps/auth/.env',
    }),
    JwtModule.registerAsync(getJwtOptions()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
