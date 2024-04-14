import { Module } from '@nestjs/common';
import { UserAccessModule } from '@project/user-access';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserAccessModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
