import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_TEXT_QUOTE_POST, LENGTH_AUTHOR_QUOTE_POST, QUOTE_AUTHOR_API } from '@project/constants/post-constant';

export class UpdateQuotePostDto {
  @ApiProperty({
    required: true,
    type: String,
    minLength: LENGTH_TEXT_QUOTE_POST.MIN,
    maxLength: LENGTH_TEXT_QUOTE_POST.MAX,
  })
  @IsOptional()
  @MinLength(LENGTH_TEXT_QUOTE_POST.MIN)
  @MaxLength(LENGTH_TEXT_QUOTE_POST.MAX)
  @IsString()
  public text?: string;

  @ApiProperty({
    description: QUOTE_AUTHOR_API.DESCRIPTION,
    example: QUOTE_AUTHOR_API.EXAMPLE,
    required: true,
    type: String,
    minLength: LENGTH_AUTHOR_QUOTE_POST.MIN,
    maxLength: LENGTH_AUTHOR_QUOTE_POST.MAX,
  })
  @IsOptional()
  @MinLength(LENGTH_AUTHOR_QUOTE_POST.MIN)
  @MaxLength(LENGTH_AUTHOR_QUOTE_POST.MAX)
  @IsString()
  public author?: string;
}
