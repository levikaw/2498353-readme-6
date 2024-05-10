import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class FilePathWithEntityIdDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public filePath!: string;
}
