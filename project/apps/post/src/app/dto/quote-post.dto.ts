import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_LENGTH_AUTHOR_QUOTE_POST,
  MIN_LENGTH_TEXT_QUOTE_POST,
  MAX_LENGTH_TEXT_QUOTE_POST,
  MIN_LENGTH_AUTHOR_QUOTE_POST,
  QUOTE_TEXT_API,
  QUOTE_AUTHOR_API,
} from '../constants';
import { CreateBasePostDto } from './base-post.dto';
import { QuotePost } from '@project/post-access';

export class CreateQuotePostDto extends CreateBasePostDto implements QuotePost {
  @ApiProperty(QUOTE_TEXT_API)
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_TEXT_QUOTE_POST)
  @MaxLength(MAX_LENGTH_TEXT_QUOTE_POST)
  @IsString()
  public text!: string;

  @ApiProperty(QUOTE_AUTHOR_API)
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_AUTHOR_QUOTE_POST)
  @MaxLength(MAX_LENGTH_AUTHOR_QUOTE_POST)
  @IsString()
  public author!: string;
}
