import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_TEXT_QUOTE_POST, LENGTH_AUTHOR_QUOTE_POST, QUOTE_TEXT_API, QUOTE_AUTHOR_API } from '../constants';
import { BasePostDto } from './base-post.dto';

export class QuotePostDto extends BasePostDto {
  @ApiProperty({
    description: QUOTE_TEXT_API.DESCRIPTION,
    example: QUOTE_TEXT_API.EXAMPLE,
  })
  @IsNotEmpty()
  @MinLength(LENGTH_TEXT_QUOTE_POST.MIN)
  @MaxLength(LENGTH_TEXT_QUOTE_POST.MAX)
  @IsString()
  public text!: string;

  @ApiProperty({
    description: QUOTE_AUTHOR_API.DESCRIPTION,
    example: QUOTE_AUTHOR_API.EXAMPLE,
  })
  @IsNotEmpty()
  @MinLength(LENGTH_AUTHOR_QUOTE_POST.MIN)
  @MaxLength(LENGTH_AUTHOR_QUOTE_POST.MAX)
  @IsString()
  public author!: string;
}
