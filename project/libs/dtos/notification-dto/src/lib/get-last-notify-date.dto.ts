import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetLastNotifyDateDto {
  @Expose()
  @IsNotEmpty()
  @IsDate()
  public date!: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public dateString!: string;
}
