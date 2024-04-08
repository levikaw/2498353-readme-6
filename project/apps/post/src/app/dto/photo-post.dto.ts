import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoPost } from '@project/post-access';
import { CreateBasePostDto } from './base-post.dto';

export class CreatePhotoPostDto extends CreateBasePostDto implements PhotoPost {
  @ApiProperty({
    description: 'File identificator for uploaded photo',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  fileId!: string;
}
