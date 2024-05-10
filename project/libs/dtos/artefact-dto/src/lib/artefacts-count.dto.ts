import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class ArtefactsCountDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  public count!: number;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public postId!: string;
}
