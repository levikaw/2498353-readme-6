import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MAX_LENGTH_ANNONCE_TEXT_POST,
  MAX_LENGTH_NAME_POST,
  MAX_LENGTH_TEXT_TEXT_POST,
  MIN_LENGTH_ANNONCE_TEXT_POST,
  MIN_LENGTH_NAME_POST,
  MIN_LENGTH_TEXT_TEXT_POST,
} from '../constants';
import { TextPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreateTextPostDto extends CreateBasePostDto implements TextPost {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_NAME_POST)
  @MaxLength(MAX_LENGTH_NAME_POST)
  @IsString()
  public name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_TEXT_TEXT_POST)
  @MaxLength(MAX_LENGTH_TEXT_TEXT_POST)
  @IsString()
  public text!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_ANNONCE_TEXT_POST)
  @MaxLength(MAX_LENGTH_ANNONCE_TEXT_POST)
  @IsString()
  public announcement!: string;
}
