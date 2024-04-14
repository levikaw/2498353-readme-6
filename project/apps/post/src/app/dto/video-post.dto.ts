import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ALLOWED_VIDEO_URLS, MAX_LENGTH_NAME_POST, MIN_LENGTH_NAME_POST, VIDEO_LINK_API } from '../constants';
import { VideoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_NAME_POST)
  @MaxLength(MAX_LENGTH_NAME_POST)
  @IsString()
  public name!: string;

  @ApiProperty(VIDEO_LINK_API)
  @IsNotEmpty()
  @IsUrl({ host_whitelist: ALLOWED_VIDEO_URLS })
  public link!: string;
}
