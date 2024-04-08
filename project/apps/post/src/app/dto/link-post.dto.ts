import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LinkPost } from '@project/post-access';
import { MAX_LENGTH_TEXT_LINK_POST } from '@project/constants';
import { CreateBasePostDto } from './base-post.dto';

export class CreateLinkPostDto extends CreateBasePostDto implements LinkPost {
  @ApiProperty({
    description: 'Link description',
    example: 'To see my project follow link below',
  })
  @IsOptional()
  @MaxLength(MAX_LENGTH_TEXT_LINK_POST)
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://example.com',
  })
  @IsNotEmpty()
  @IsUrl()
  link!: string;
}
