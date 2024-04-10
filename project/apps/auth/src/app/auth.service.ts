import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserAccessRepository, UserAccessEntity } from '@project/user-access';
import { UserRole } from '@project/user-access';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from '@project/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccessRepository, private readonly jwtService: JwtService) {}

  public async register(user: CreateUserDto): Promise<UserAccessEntity> {
    const existUser = await this.userRepository.findByEmail(user.email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    // TODO: for avatar /api/upload -> fileid
    const userEntity = await new UserAccessEntity({ role: UserRole.User, passwordHash: '', ...user }).createPassword(
      user.password,
    );
    this.userRepository.save(userEntity);

    return userEntity;
  }

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
