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
import { MIN_PORT, MAX_PORT, Environment } from '../constants';
import { DEFAULT_AUTH_SERVICE_PORT, DEFAULT_EXPIRES_TOKEN_IN } from './constants';

export class AuthServiceConfiguration {
  @IsNumber()
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_AUTH_SERVICE_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNumber()
  @IsOptional()
  public expiresTokenIn: number = DEFAULT_EXPIRES_TOKEN_IN;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  public jwtSecret: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
