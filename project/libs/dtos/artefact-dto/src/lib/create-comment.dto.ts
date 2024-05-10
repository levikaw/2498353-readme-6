import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { COMMENT_LENGTH } from '@project/constants/comment-constant';

export class CreateCommentDto {
  @ApiProperty({
    example: 'some text',
    required: true,
    type: String,
    minLength: COMMENT_LENGTH.MIN,
    maxLength: COMMENT_LENGTH.MAX,
  })
  @Expose()
  @IsNotEmpty()
  @MinLength(COMMENT_LENGTH.MIN)
  @MaxLength(COMMENT_LENGTH.MAX)
  @IsString()
  public text!: string;
}
