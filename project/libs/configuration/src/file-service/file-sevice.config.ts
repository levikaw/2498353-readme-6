import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, Min, validateOrReject } from 'class-validator';
import { MIN_PORT, MAX_PORT, DEFAULT_FILE_SERVICE_PORT, Environment } from '@project/constants';

export class FileServiceConfiguration {
  @IsNumber()
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_FILE_SERVICE_PORT;

  @IsEnum(Environment)
  @IsNotEmpty()
  public environment: Environment;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
