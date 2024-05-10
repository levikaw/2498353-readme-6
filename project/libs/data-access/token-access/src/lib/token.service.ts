import { Injectable } from '@nestjs/common';
import { TokenAccessRepository } from './token-access.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtAccessOptions, getJwtRefreshOptions } from '@project/configuration';
import { TokensDto, TokenUserDto } from '@project/dtos/tokens-dto';
import { parseJwtExpiredTime } from './utils/parse-jwt-expired-time';
import { RefreshTokenInterface } from './types/refresh-token.interface';
import dayjs = require('dayjs');

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenAccessRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getTokens(payload: TokenUserDto): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, getJwtAccessOptions(this.configService)),
      this.jwtService.signAsync(payload, getJwtRefreshOptions(this.configService)),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async setToken(userId: string, refreshToken: string): Promise<void> {
    const jwtOptions = getJwtRefreshOptions(this.configService);
    const timeValue = parseJwtExpiredTime(String(jwtOptions.expiresIn));

    await this.tokenRepository.setRefreshToken(userId, refreshToken, dayjs().add(timeValue.value, timeValue.unit).toDate());
    await this.tokenRepository.deleteExpiredTokens();
  }

  public async getTokenUserById(userId: string): Promise<RefreshTokenInterface> {
    return this.tokenRepository.findByUserId(userId).then((resp) => resp.toObject());
  }
}
