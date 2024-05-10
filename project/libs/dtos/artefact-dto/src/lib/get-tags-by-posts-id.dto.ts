import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetTagsByPostsIdDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public tagId!: string;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public postId!: string;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public name!: string;
}
