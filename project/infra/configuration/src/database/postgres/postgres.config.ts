import {
  IsEmail,
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
import { POSTGRES_VALIDATION_MESSAGE, DEFAULT_POSTGRES_PORT } from './constants';

export class PostgresConfiguration {
  @IsString({ message: POSTGRES_VALIDATION_MESSAGE.DB })
  @IsNotEmpty()
  public db: string;

  @IsString({ message: POSTGRES_VALIDATION_MESSAGE.HOST })
  @IsNotEmpty()
  public host: string;

  @IsNumber({}, { message: POSTGRES_VALIDATION_MESSAGE.PORT })
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_POSTGRES_PORT;

  @IsString({ message: POSTGRES_VALIDATION_MESSAGE.USER })
  @IsNotEmpty()
  public user: string;

  @IsString({ message: POSTGRES_VALIDATION_MESSAGE.PASSWORD })
  @IsNotEmpty()
  // @IsStrongPassword()
  public password: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
