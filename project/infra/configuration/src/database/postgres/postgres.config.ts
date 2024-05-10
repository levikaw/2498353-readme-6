import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { PORT } from '../../constants';
import { DEFAULT_POSTGRES_PORT } from './constants';

export class PostgresConfiguration {
  @IsString()
  @IsNotEmpty()
  public db: string;

  @IsString()
  @IsNotEmpty()
  public host: string;

  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_POSTGRES_PORT;

  @IsString()
  @IsNotEmpty()
  public user: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
