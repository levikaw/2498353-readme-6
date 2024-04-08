import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'User identificator',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Post identificator',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
