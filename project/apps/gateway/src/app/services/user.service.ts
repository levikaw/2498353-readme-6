import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GATEWAY_ALIAS } from '@project/configuration';

import { NotificationPostsListDto } from '@project/dtos/post-dto';
import { TokensDto } from '@project/dtos/tokens-dto';
import { AuthUserDto, ChangePasswordDto, CreateUserDto, LoginUserDto } from '@project/dtos/user-dto';
import { genAuthHeader, resolveData } from '../utils';

@Injectable()
export class UserService {
  private readonly userBaseUrl: string;
  private readonly authBaseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.userBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.userBaseUrl`);
    this.authBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.authBaseUrl`);
  }

  public async getUsersByIds(usersIds: string[]): Promise<AuthUserDto[]> {
    return this.httpService.axiosRef
      .get<AuthUserDto[]>(`${this.userBaseUrl}/user`, {
        params: { usersIds },
      })
      .then(resolveData);
  }

  public async changePassword(passwordCredential: ChangePasswordDto, authHeader: string): Promise<AuthUserDto> {
    return this.httpService.axiosRef
      .patch<AuthUserDto>(`${this.userBaseUrl}/user`, passwordCredential, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async login(user: LoginUserDto): Promise<TokensDto> {
    return this.httpService.axiosRef.post<TokensDto>(`${this.authBaseUrl}/auth/login`, user).then(resolveData);
  }

  public async refreshTokens(authHeader: string): Promise<TokensDto> {
    return this.httpService.axiosRef
      .post<TokensDto>(`${this.authBaseUrl}/auth/refresh`, null, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async requestNotification(publications: NotificationPostsListDto[], authHeader: string): Promise<void> {
    return this.httpService.axiosRef
      .post(`${this.userBaseUrl}/user/request-notify`, publications, genAuthHeader(authHeader))
      .then(resolveData);
  }

  public async register(account: CreateUserDto, avatar: string, id: string): Promise<AuthUserDto> {
    return this.httpService.axiosRef
      .post<AuthUserDto>(`${this.userBaseUrl}/user/register`, { ...account, avatar, id })
      .then(resolveData);
  }
}
