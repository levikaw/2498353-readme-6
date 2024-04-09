import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserAccessModule } from '@project/user-access';
import { jwtConstants } from '@project/constants';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserAccessModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
