import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { MongoDBValidationMessage, MIN_PORT, MAX_PORT, DEFAULT_MONGO_PORT } from '@project/constants';

export class MongoConfiguration {
  @IsString({ message: MongoDBValidationMessage.DBNameRequired })
  public name: string;

  @IsString({ message: MongoDBValidationMessage.DBHostRequired })
  public host: string;

  @IsNumber({}, { message: MongoDBValidationMessage.DBPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: MongoDBValidationMessage.DBUserRequired })
  public user: string;

  @IsString({ message: MongoDBValidationMessage.DBPasswordRequired })
  public password: string;

  @IsString({ message: MongoDBValidationMessage.DBBaseAuthRequired })
  public authBase: string;

  public async validate(): Promise<void> {
    // debugger;
    await validateOrReject(this);
  }
}
