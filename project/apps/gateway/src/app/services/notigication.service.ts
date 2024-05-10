import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GATEWAY_ALIAS } from '@project/configuration';


import { GetLastNotifyDateDto } from '@project/dtos/notification-dto';
import { genAuthHeader, resolveData } from '../utils';

@Injectable()
export class NotificactionService {
  private readonly notifyBaseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.notifyBaseUrl = configService.get<string>(`${GATEWAY_ALIAS}.notifyBaseUrl`);
  }

  public async getLastNotifiedDateByUserId(authHeader: string): Promise<GetLastNotifyDateDto> {
    return this.httpService.axiosRef
      .get<GetLastNotifyDateDto>(`${this.notifyBaseUrl}/notify`, genAuthHeader(authHeader))
      .then(resolveData);
  }
}
