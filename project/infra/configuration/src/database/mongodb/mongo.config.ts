import { IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Max, Min, validateOrReject } from 'class-validator';
import { PORT } from '../../constants';
import { MONGO_VALIDATION_MESSAGE, DEFAULT_MONGO_PORT } from './constants';

export class MongoConfiguration {
  @IsString({ message: MONGO_VALIDATION_MESSAGE.NAME })
  @IsNotEmpty()
  public name: string;

  @IsString({ message: MONGO_VALIDATION_MESSAGE.HOST })
  @IsNotEmpty()
  public host: string;

  @IsNumber({}, { message: MONGO_VALIDATION_MESSAGE.PORT })
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: MONGO_VALIDATION_MESSAGE.USER })
  @IsNotEmpty()
  public user: string;

  @IsString({ message: MONGO_VALIDATION_MESSAGE.PASSWORD })
  @IsNotEmpty()
  // @IsStrongPassword()
  public password: string;

  @IsString({ message: MONGO_VALIDATION_MESSAGE.AUTH })
  @IsNotEmpty()
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
