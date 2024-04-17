import { IsArray, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USERID_API } from '@project/constants';
import { Type } from 'class-transformer';
import { POST_TAGS_API } from '../constants';

export class BasePostDto {
  @ApiProperty({
    description: USERID_API.DESCRIPTION,
    example: USERID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty(POST_TAGS_API)
  @IsOptional()
  @IsArray({ each: true })
  @Type(() => String)
  public tags?: string[];
}
