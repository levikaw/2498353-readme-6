import { PostTypeEnum } from '@project/post-access';
import { IsBooleanString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Sort {
  Like = 'likes',
  Comments = 'comments',
  Default = 'publishedAt',
}

export class QueryPostCatalogDto {
  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  public page?: number = 1;

  @ApiProperty({
    description: 'Sort direction: by published date, ly likes count, by comments count',
    type: String,
    required: false,
    enum: Sort,
    default: Sort.Default,
  })
  @IsEnum(Sort)
  @IsOptional()
  public sort?: Sort = Sort.Default;

  @ApiProperty({
    description: 'Autorized user can request their sketch publications. If true ignore other filters',
    type: Boolean,
    required: false,
    default: false,
  })
  @IsBooleanString()
  @IsOptional()
  public isNeedMySketch?: string = 'false';

  @ApiProperty({
    description: 'search by post type',
    type: String,
    required: false,
    enum: PostTypeEnum,
  })
  @IsEnum(PostTypeEnum)
  @IsOptional()
  public type?: PostTypeEnum;

  @ApiProperty({
    description: 'search by tag',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  public tag?: string;

  @ApiProperty({
    description: 'search by post owns',
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public userId?: string;
}
