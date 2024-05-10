import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ALLOWED_VIDEO_URLS, LENGTH_NAME_POST, VIDEO_LINK_API } from '@project/constants/post-constant';

export class UpdateVideoPostDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'post name',
    minLength: LENGTH_NAME_POST.MIN,
    maxLength: LENGTH_NAME_POST.MAX,
  })
  @IsOptional()
  @MinLength(LENGTH_NAME_POST.MIN)
  @MaxLength(LENGTH_NAME_POST.MAX)
  @IsString()
  public name?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: VIDEO_LINK_API.DESCRIPTION,
    example: VIDEO_LINK_API.EXAMPLE,
  })
  @IsOptional()
  @IsUrl({ host_whitelist: ALLOWED_VIDEO_URLS })
  public link?: string;
}
