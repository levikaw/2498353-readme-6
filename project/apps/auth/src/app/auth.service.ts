import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUser, User, UserAccessRepository } from '@project/user-access';
import { AUTH_MESSAGES_EXCEPTION } from './constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly jwtService: JwtService) {}

  public async authUser(user: LoginUserDto): Promise<AuthUser> {
    const existUser = await this.userRepository.findOneByEmail(user.email);

    if (!existUser) {
      throw new NotFoundException(AUTH_MESSAGES_EXCEPTION.NOT_FOUND);
    }

    if (!(await existUser.comparePassword(user.password))) {
      throw new UnauthorizedException(AUTH_MESSAGES_EXCEPTION.WRONG_PASSWORD);
    }

    return existUser.toObject();
  }

  public async getAuthToken(payload: User): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
