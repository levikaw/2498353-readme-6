import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserAccessRepository } from '@project/user-access';
import { AUTH_MESSAGES_EXCEPTION } from './constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly jwtService: JwtService) {}

  public async authUser(user: LoginUserDto): Promise<{ token: string }> {
    const existUser = await this.userRepository.findByEmail(user.email);

    if (!existUser) {
      throw new NotFoundException(AUTH_MESSAGES_EXCEPTION.NotFound);
    }

    if (!(await existUser.comparePassword(user.password))) {
      throw new UnauthorizedException(AUTH_MESSAGES_EXCEPTION.WrongPassword);
    }

    return {
      token: await this.jwtService.signAsync(existUser.toObject()),
    };
  }
}
