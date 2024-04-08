import { IsArray, IsBoolean, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType, UserPost } from '@project/post-access';
import { Type } from 'class-transformer';

export class CreateBasePostDto implements UserPost {
  @ApiProperty({
    description: 'User identificator',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Post type',
    example: 'video',
    enum: PostType,
  })
  @IsNotEmpty()
  @IsEnum(PostType)
  type!: PostType;

  @ApiProperty({
    description: 'Post tags array',
    example: '["video", "cats", "funny"]',
    isArray: true,
  })
  @IsOptional()
  @IsArray({ each: true })
  @Type(() => String)
  tags?: string[];

  @ApiProperty({
    description: 'Post status',
    example: 'published',
    enum: PostStatus,
  })
  @IsNotEmpty()
  @IsEnum(PostStatus)
  status!: PostStatus;

  @ApiProperty({
    description: 'Post id that was reposted ',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsOptional()
  @IsUUID()
  repostedFrom?: string;

  @ApiProperty({
    description: 'Is current post reposted?',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  @ValidateIf((post) => isNotEmpty(post.repostedFrom))
  reposted?: boolean;
}
