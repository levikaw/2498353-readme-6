import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import 'multer';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '@project/constants';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'This is my comment fro your post',
  })
  @IsNotEmpty()
  @MinLength(MIN_COMMENT_LENGTH)
  @MaxLength(MAX_COMMENT_LENGTH)
  @IsString()
  text!: string;

  @ApiProperty({
    description: 'User identificator',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}
