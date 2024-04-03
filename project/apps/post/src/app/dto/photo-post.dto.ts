import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreatePhotoPostDto extends CreateBasePostDto implements PhotoPost {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  fileId!: string;
}
