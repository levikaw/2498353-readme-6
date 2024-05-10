import { NullableEnum } from '@project/common';
import { PostFilterInterface, PostTypeEnum } from '@project/post-access';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class PostFilterDto implements PostFilterInterface {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  public userId?: string[];

  @IsOptional()
  @IsEnum(PostTypeEnum)
  public type?: PostTypeEnum;

  @IsOptional()
  public publishedAt?: Date | NullableEnum;
}
