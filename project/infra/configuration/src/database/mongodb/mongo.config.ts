import { IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Max, Min, validateOrReject } from 'class-validator';
import { PORT } from '../../constants';
import { DEFAULT_MONGO_PORT } from './constants';

export class MongoConfiguration {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public host: string;

  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString()
  @IsNotEmpty()
  public user: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
