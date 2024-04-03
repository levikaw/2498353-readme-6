import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType, UserPost } from '@project/post-access';

export class CreateBasePostDto implements UserPost {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PostType)
  type!: PostType;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PostStatus)
  status!: PostStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  reposted?: string;
}
