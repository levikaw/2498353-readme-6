import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MAX_LENGTH_TEXT_LINK_POST } from '@project/constants/post-constant';

export class LinkPostDto {
  @ApiProperty({
    required: false,
    type: String,
    maxLength: MAX_LENGTH_TEXT_LINK_POST,
  })
  @IsOptional()
  @MaxLength(MAX_LENGTH_TEXT_LINK_POST)
  @IsString()
  public text?: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  public link!: string;
}
