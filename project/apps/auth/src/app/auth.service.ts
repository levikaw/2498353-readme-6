import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserAccessRepository } from '@project/user-access';
import { AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from '@project/constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly jwtService: JwtService) {}

  public async authUser(user: LoginUserDto): Promise<{ token: string }> {
    const existUser = await this.userRepository.findByEmail(user.email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(user.password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return {
      token: await this.jwtService.signAsync(existUser.toObject()),
    };
  }
}
