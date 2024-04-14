import { IsArray, IsBoolean, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { PostType, UserPost } from '@project/post-access';
import { POSTID_API, USERID_API } from '@project/constants';
import { Type } from 'class-transformer';
import { POST_STATUS_API, POST_TAGS_API, POST_TYPE_API, REPOSTED_API } from '../constants';

export class CreateBasePostDto {
  @ApiProperty(USERID_API)
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty(POST_TAGS_API)
  @IsOptional()
  @IsArray({ each: true })
  @Type(() => String)
  public tags?: string[];
}
