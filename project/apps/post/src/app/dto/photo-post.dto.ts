import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';
import { FILEID_API } from '../constants';

export class CreatePhotoPostDto extends CreateBasePostDto implements PhotoPost {
  @ApiProperty(FILEID_API)
  @IsNotEmpty()
  @IsUUID()
  public fileId!: string;
}
