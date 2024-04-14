import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { MIN_PORT, MAX_PORT } from '../../constants';
import { MONGO_DB_VaLIDATION_MESSAGE, DEFAULT_MONGO_PORT } from './constants';

export class MongoConfiguration {
  @IsString({ message: MONGO_DB_VaLIDATION_MESSAGE.NameRequired })
  @IsNotEmpty()
  public name: string;

  @IsString({ message: MONGO_DB_VaLIDATION_MESSAGE.HostRequired })
  @IsNotEmpty()
  public host: string;

  @IsNumber({}, { message: MONGO_DB_VaLIDATION_MESSAGE.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: MONGO_DB_VaLIDATION_MESSAGE.UserRequired })
  @IsNotEmpty()
  public user: string;

  @IsString({ message: MONGO_DB_VaLIDATION_MESSAGE.PasswordRequired })
  @IsNotEmpty()
  public password: string;

  @IsString({ message: MONGO_DB_VaLIDATION_MESSAGE.BaseAuthRequired })
  @IsNotEmpty()
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
