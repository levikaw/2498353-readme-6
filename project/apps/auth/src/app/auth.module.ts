import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserAccessModule } from '@project/user-access';
import { authServiceRegister, JwtAccessStrategy, JwtRefreshStrategy, postgresRegister } from '@project/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authServiceRegister, postgresRegister],
      envFilePath: 'apps/auth/.env',
    }),
    JwtModule.register({
      global: true,
    }),
    UserAccessModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
