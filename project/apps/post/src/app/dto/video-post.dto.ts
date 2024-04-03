import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MAX_LENGTH_NAME_POST, MIN_LENGTH_NAME_POST } from '@project/constants';
import { VideoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto implements VideoPost {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH_NAME_POST)
  @MaxLength(MAX_LENGTH_NAME_POST)
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  link!: string;
}
