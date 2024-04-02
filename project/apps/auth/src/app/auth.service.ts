import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserAccountRepository, UserAccountEntity } from '@project/account';
import { UserRole } from '@project/core';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from '@project/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserAccountRepository, private jwtService: JwtService) {}

  /**
   * Регистрация пользователя
   * @param {CreateUserDto} user
   * @returns {Promise<UserAccountEntity>}
   */
  public async register(user: CreateUserDto): Promise<UserAccountEntity> {
    const { email, password, avatar, login } = user;

    const newUser = {
      email,
      avatar,
      login,
      role: UserRole.User,
      passwordHash: '',
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserAccountEntity(newUser).createPassword(password);

    this.userRepository.create(userEntity);

    return userEntity;
  }

  /**
   * Аутентификация пользователя
   * @param {LoginUserDto} user
   * @returns {Promise<UserAccountEntity>}
   */
  public async authUser(user: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = user;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return {
      token: await this.jwtService.signAsync(existUser.toObject()),
    };
  }
}
