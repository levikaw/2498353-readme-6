import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USERID_API } from '@project/constants';
import { COMMENT_LENGTH, TEXT_API } from '../constants';

export class CreateCommentDto {
  @ApiProperty({
    description: TEXT_API.DESCRIPTION,
    example: TEXT_API.EXAMPLE,
  })
  @IsNotEmpty()
  @MinLength(COMMENT_LENGTH.MIN)
  @MaxLength(COMMENT_LENGTH.MAX)
  @IsString()
  public text!: string;

  @ApiProperty({
    description: USERID_API.DESCRIPTION,
    example: USERID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;
}
