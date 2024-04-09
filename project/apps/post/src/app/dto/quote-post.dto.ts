import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_LENGTH_AUTHOR_QUOTE_POST,
  MIN_LENGTH_TEXT_QUOTE_POST,
  MAX_LENGTH_TEXT_QUOTE_POST,
  MIN_LENGTH_AUTHOR_QUOTE_POST,
} from '@project/constants';
import { CreateBasePostDto } from './base-post.dto';
import { QuotePost } from '@project/post-access';

export class CreateQuotePostDto extends CreateBasePostDto implements QuotePost {
  @ApiProperty({
    description: 'Quote text',
    example: 'The way to get started is to quit talking and begin doing',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_TEXT_QUOTE_POST)
  @MaxLength(MAX_LENGTH_TEXT_QUOTE_POST)
  @IsString()
  text!: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Walt Disney',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_AUTHOR_QUOTE_POST)
  @MaxLength(MAX_LENGTH_AUTHOR_QUOTE_POST)
  @IsString()
  author!: string;
}
