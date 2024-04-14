import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LinkPost } from '@project/post-access';
import { MAX_LENGTH_TEXT_LINK_POST, LINK_TEXT_API, LINK_API } from '../constants';
import { CreateBasePostDto } from './base-post.dto';

export class CreateLinkPostDto extends CreateBasePostDto implements LinkPost {
  @ApiProperty(LINK_TEXT_API)
  @IsOptional()
  @MaxLength(MAX_LENGTH_TEXT_LINK_POST)
  @IsString()
  public text?: string;

  @ApiProperty(LINK_API)
  @IsNotEmpty()
  @IsUrl()
  public link!: string;
}
