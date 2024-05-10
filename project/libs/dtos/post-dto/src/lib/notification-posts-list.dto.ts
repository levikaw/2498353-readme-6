import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class NotificationPostsListDto {
  @ApiProperty({
    description: 'user identificator',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  public author!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public title!: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  public likeCount!: number;

  @ApiProperty({
    description: 'path to media if post type is `photo`',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  public imagePath?: string;

  @ApiProperty({
    description: 'published date',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public publishedAt!: string;
}
