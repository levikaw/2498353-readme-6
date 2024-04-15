import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBasePostDto } from './base-post.dto';
import { FILEID_API } from '../constants';

export class CreatePhotoPostDto extends CreateBasePostDto {
  @ApiProperty({
    description: FILEID_API.DESCRIPTION,
    example: FILEID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public fileId!: string;
}
