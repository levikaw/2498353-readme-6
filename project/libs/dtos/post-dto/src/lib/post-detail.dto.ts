import { TagDto } from '@project/dtos/artefact-dto';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CommonPostDto } from './common-post.dto';

export class PostDetailDto extends CommonPostDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TagDto)
  public tags?: TagDto[] = [];

  @IsOptional()
  @IsString()
  public imagePath?: string;
}
