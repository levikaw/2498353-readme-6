import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonPostDto } from './common-post.dto';
import { AuthUserDto } from '@project/dtos/user-dto';

export class PostCatalogDto extends CommonPostDto {
  @IsNotEmpty()
  @Type(() => AuthUserDto)
  @IsObject()
  public user!: AuthUserDto;

  @IsNotEmpty()
  @IsNumber()
  public likes!: number;

  @IsNotEmpty()
  @IsNumber()
  public comments!: number;

  @IsOptional()
  @IsString()
  public imagePath: string;
}
