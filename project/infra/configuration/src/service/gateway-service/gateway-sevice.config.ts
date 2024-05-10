import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUrl, Max, Min, validateOrReject } from 'class-validator';
import { PORT, Environment } from '../../constants';
import { DEFAULT_GATEWAY_SERVICE_PORT, DEFAULT_MAX_REDIRECTS, DEFAULT_TIMEOUT } from './constants';

export class GatewayServiceConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_GATEWAY_SERVICE_PORT;

  @IsNumber()
  @IsOptional()
  public timout: number = DEFAULT_TIMEOUT;

  @IsNumber()
  @IsOptional()
  public maxRedirects: number = DEFAULT_MAX_REDIRECTS;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNotEmpty()
  @IsUrl()
  public userBaseUrl: string;

  @IsNotEmpty()
  @IsUrl()
  public fileBaseUrl: string;

  @IsNotEmpty()
  @IsUrl()
  public authBaseUrl: string;

  @IsNotEmpty()
  @IsUrl()
  public postBaseUrl: string;

  @IsNotEmpty()
  @IsUrl()
  public notifyBaseUrl: string;

  @IsNotEmpty()
  @IsUrl()
  public artefactBaseUrl: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
