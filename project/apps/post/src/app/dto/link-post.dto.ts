import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MAX_LENGTH_TEXT_LINK_POST, LINK_TEXT_API, LINK_API } from '../constants';
import { BasePostDto } from './base-post.dto';

export class LinkPostDto extends BasePostDto {
  @ApiProperty({
    description: LINK_TEXT_API.DESCRIPTION,
    example: LINK_TEXT_API.EXAMPLE,
  })
  @IsOptional()
  @MaxLength(MAX_LENGTH_TEXT_LINK_POST)
  @IsString()
  public text?: string;

  @ApiProperty({
    description: LINK_API.DESCRIPTION,
    example: LINK_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUrl()
  public link!: string;
}
