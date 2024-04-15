import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ALLOWED_VIDEO_URLS, LENGTH_NAME_POST, VIDEO_LINK_API } from '../constants';
import { CreateBasePostDto } from './base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(LENGTH_NAME_POST.MIN)
  @MaxLength(LENGTH_NAME_POST.MAX)
  @IsString()
  public name!: string;

  @ApiProperty({
    description: VIDEO_LINK_API.DESCRIPTION,
    example: VIDEO_LINK_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUrl({ host_whitelist: ALLOWED_VIDEO_URLS })
  public link!: string;
}
