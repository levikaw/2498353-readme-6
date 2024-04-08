import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_LENGTH_ANNONCE_TEXT_POST,
  MAX_LENGTH_NAME_POST,
  MAX_LENGTH_TEXT_TEXT_POST,
  MIN_LENGTH_ANNONCE_TEXT_POST,
  MIN_LENGTH_NAME_POST,
  MIN_LENGTH_TEXT_TEXT_POST,
} from '@project/constants';
import { TextPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreateTextPostDto extends CreateBasePostDto implements TextPost {
  @ApiProperty({
    description: 'Post title',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_NAME_POST)
  @MaxLength(MAX_LENGTH_NAME_POST)
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Post text',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_TEXT_TEXT_POST)
  @MaxLength(MAX_LENGTH_TEXT_TEXT_POST)
  @IsString()
  text!: string;

  @ApiProperty({
    description: 'Post announcement',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_ANNONCE_TEXT_POST)
  @MaxLength(MAX_LENGTH_ANNONCE_TEXT_POST)
  @IsString()
  announcement!: string;
}
