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
import { PORT, Environment } from '../constants';
import { RABBITMQ_DEFAULT_PORT } from './constants';

export class RabbitMQConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = RABBITMQ_DEFAULT_PORT;

  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsNotEmpty()
  public webUIPort: number;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNotEmpty()
  public host: string;

  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public user: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
