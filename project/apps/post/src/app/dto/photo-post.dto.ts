import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BasePostDto } from './base-post.dto';
import { FILEID_API } from '../constants';

export class PhotoPostDto extends BasePostDto {
  @ApiProperty({
    description: FILEID_API.DESCRIPTION,
    example: FILEID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public fileId!: string;
}
