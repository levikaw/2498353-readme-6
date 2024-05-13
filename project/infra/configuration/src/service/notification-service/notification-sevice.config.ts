import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { PORT, Environment } from '../../constants';
import { NOTIFY_DEFAULT_PORTS } from './constants';

export class NotificationServiceConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = NOTIFY_DEFAULT_PORTS.APP_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public webUIPort: number = NOTIFY_DEFAULT_PORTS.WEB_UI;

  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public smtpPort: number = NOTIFY_DEFAULT_PORTS.SMTP;

  @IsNotEmpty()
  @IsString()
  public host: string;

  @IsString()
  @IsNotEmpty()
  public appHost: string;

  @IsNotEmpty()
  @IsString()
  public user: string;

  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @IsNotEmpty()
  @IsEmail()
  public from: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
