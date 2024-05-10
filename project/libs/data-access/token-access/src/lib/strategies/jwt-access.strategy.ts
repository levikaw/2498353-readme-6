import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH_ALIAS } from '@project/configuration';
import { TokenUserDto } from '@project/dtos/tokens-dto';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(`${AUTH_ALIAS}.jwtAccessSecret`),
    });
  }

  public async validate(payload: TokenUserDto): Promise<TokenUserDto> {
    return payload;
  }
}
