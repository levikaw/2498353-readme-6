import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import 'multer';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '@project/constants';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MIN_COMMENT_LENGTH)
  @MaxLength(MAX_COMMENT_LENGTH)
  @IsString()
  text!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}
