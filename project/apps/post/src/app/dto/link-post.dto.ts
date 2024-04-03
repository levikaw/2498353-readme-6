import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LinkPost } from '@project/post-access';
import { MAX_LENGTH_TEXT_LINK_POST } from '@project/constants';
import { CreateBasePostDto } from './base-post.dto';

export class CreateLinkPostDto extends CreateBasePostDto implements LinkPost {
  @ApiProperty()
  @IsOptional()
  @MaxLength(MAX_LENGTH_TEXT_LINK_POST)
  @IsString()
  text?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  link!: string;
}
