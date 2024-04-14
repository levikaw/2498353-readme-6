import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import 'multer';
import { USERID_API } from '@project/constants';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, TEXT_API } from '../constants';

export class CreateCommentDto {
  @ApiProperty(TEXT_API)
  @IsNotEmpty()
  @MinLength(MIN_COMMENT_LENGTH)
  @MaxLength(MAX_COMMENT_LENGTH)
  @IsString()
  public text!: string;

  @ApiProperty(USERID_API)
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;
}
