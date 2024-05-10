import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GATEWAY_ALIAS } from '@project/configuration';
import { TokenUserDto } from '@project/dtos/tokens-dto';

@Injectable()
export class CheckRefreshGuard implements CanActivate {
  baseUrl: string;
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>(`${GATEWAY_ALIAS}.authBaseUrl`);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authRequest = await this.httpService.axiosRef.get<TokenUserDto>(`${this.baseUrl}/auth/check-refresh`, {
      headers: {
        Authorization: request.headers['authorization'],
      },
    });

    request['user'] = authRequest.data;
    return true;
  }
}
