import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_ANNONCE_TEXT_POST, LENGTH_NAME_POST, LENGTH_TEXT_TEXT_POST } from '../constants';
import { BasePostDto } from './base-post.dto';

export class TextPostDto extends BasePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(LENGTH_NAME_POST.MIN)
  @MaxLength(LENGTH_NAME_POST.MAX)
  @IsString()
  public name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(LENGTH_TEXT_TEXT_POST.MIN)
  @MaxLength(LENGTH_TEXT_TEXT_POST.MAX)
  @IsString()
  public text!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(LENGTH_ANNONCE_TEXT_POST.MIN)
  @MaxLength(LENGTH_ANNONCE_TEXT_POST.MAX)
  @IsString()
  public announcement!: string;
}
