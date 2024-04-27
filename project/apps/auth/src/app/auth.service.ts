import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUser, User, UserAccessEntity, UserAccessRepository } from '@project/user-access';
import { AUTH_MESSAGES_EXCEPTION } from './constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtAccessOptions, getJwtRefreshOptions } from '@project/configuration';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserAccessRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  public async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, refreshToken);
  }

  public async getTokens(payload: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, getJwtAccessOptions(this.configService)),
      this.jwtService.signAsync(payload, getJwtRefreshOptions(this.configService)),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await this.jwtService.verify(user.refreshToken, getJwtRefreshOptions(this.configService));

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.toObject());

    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }
}
