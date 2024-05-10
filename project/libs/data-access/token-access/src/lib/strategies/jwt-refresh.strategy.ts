import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH_ALIAS } from '@project/configuration';
import { TokenService } from '../token.service';
import { TokenUserDto } from '@project/dtos/tokens-dto';

export const REFRESH_STRATEGY_NAME = 'jwt-refresh';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, REFRESH_STRATEGY_NAME) {
  constructor(private readonly configService: ConfigService, private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(`${AUTH_ALIAS}.jwtRefreshSecret`),
    });
  }

  public async validate(payload: TokenUserDto): Promise<TokenUserDto> {
    const token = await this.tokenService.getTokenUserById(payload.userId);

    if (token.id !== payload.refreshTokenId) {
      throw new NotFoundException('Token does not exists!');
    }

    return payload;
  }
}
