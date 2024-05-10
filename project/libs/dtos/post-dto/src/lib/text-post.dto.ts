import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_ANNONCE_TEXT_POST, LENGTH_NAME_POST, LENGTH_TEXT_TEXT_POST } from '@project/constants/post-constant';

export class TextPostDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'post name',
    minLength: LENGTH_NAME_POST.MIN,
    maxLength: LENGTH_NAME_POST.MAX,
  })
  @IsNotEmpty()
  @MinLength(LENGTH_NAME_POST.MIN)
  @MaxLength(LENGTH_NAME_POST.MAX)
  @IsString()
  public name!: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: LENGTH_TEXT_TEXT_POST.MIN,
    maxLength: LENGTH_TEXT_TEXT_POST.MAX,
  })
  @IsNotEmpty()
  @MinLength(LENGTH_TEXT_TEXT_POST.MIN)
  @MaxLength(LENGTH_TEXT_TEXT_POST.MAX)
  @IsString()
  public text!: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: LENGTH_ANNONCE_TEXT_POST.MIN,
    maxLength: LENGTH_ANNONCE_TEXT_POST.MAX,
  })
  @IsNotEmpty()
  @MinLength(LENGTH_ANNONCE_TEXT_POST.MIN)
  @MaxLength(LENGTH_ANNONCE_TEXT_POST.MAX)
  @IsString()
  public announcement!: string;
}
