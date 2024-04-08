import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MAX_LENGTH_NAME_POST, MIN_LENGTH_NAME_POST } from '@project/constants';
import { VideoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto implements VideoPost {
  @ApiProperty({
    description: 'Post title',
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_NAME_POST)
  @MaxLength(MAX_LENGTH_NAME_POST)
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Link to YouTube',
    example: 'https://www.youtube.com/watch?v=85wgFaxg6AY; https://youtu.be/85wgFaxg6AY',
  })
  @IsNotEmpty()
  @IsUrl({ host_whitelist: ['youtube.com', 'youtu.be', new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(.com)?\/.+/gm)] })
  link!: string;
}
