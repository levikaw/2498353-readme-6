import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { PORT, Environment } from '../../constants';
import { DEFAULT_FILE_SERVICE_PORT } from './constants';

export class FileServiceConfiguration {
  @IsNumber()
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_FILE_SERVICE_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  @IsNotEmpty()
  @IsString()
  public rootPath: string;

  @IsNotEmpty()
  @IsString()
  public serveRoot: string;

  @IsString()
  @IsNotEmpty()
  public appHost: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
