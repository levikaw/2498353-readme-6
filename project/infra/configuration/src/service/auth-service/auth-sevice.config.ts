import {
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
import { DEFAULT_AUTH_SERVICE_PORT } from './constants';

export class AuthServiceConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_AUTH_SERVICE_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsString()
  @IsNotEmpty()
  public expiresAccessTokenIn: string;

  @IsString()
  @IsNotEmpty()
  public expiresRefreshTokenIn: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public jwtAccessSecret: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
