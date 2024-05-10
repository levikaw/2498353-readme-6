import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ALLOWED_VIDEO_URLS, LENGTH_NAME_POST, VIDEO_LINK_API } from '@project/constants/post-constant';

export class VideoPostDto {
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
    description: VIDEO_LINK_API.DESCRIPTION,
    example: VIDEO_LINK_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUrl({ host_whitelist: ALLOWED_VIDEO_URLS })
  public link!: string;
}
