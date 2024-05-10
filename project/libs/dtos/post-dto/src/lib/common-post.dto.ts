import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/post-access';
import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CommonPostDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: PostTypeEnum,
  })
  @IsEnum(PostTypeEnum)
  public type!: PostTypeEnum;

  @ApiProperty({
    required: true,
    type: String,
    description: 'post id',
  })
  @IsNotEmpty()
  @IsUUID()
  public id?: string;

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  public createdAt?: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'is not empty if post type is text or video',
  })
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'is not empty if post type is video or link',
  })
  @IsOptional()
  @IsString()
  public link?: string;

  @ApiProperty({
    required: true,
    description: 'is not empty if post type is photo',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  public fileId?: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  public repostedFromPostId?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'is not empty if post type is quote',
  })
  @IsOptional()
  @IsString()
  public author?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'is not empty if post type is text or quote',
  })
  @IsOptional()
  @IsString()
  public text?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'is not empty if post type is text',
  })
  @IsOptional()
  @IsString()
  public announcement?: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsOptional()
  @IsDate()
  public publishedAt?: Date;
}
