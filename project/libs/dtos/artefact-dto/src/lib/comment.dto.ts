import { ArtefactDto } from './artefact.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { COMMENT_LENGTH } from '@project/constants/comment-constant';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto extends ArtefactDto {
  @Expose()
  @ApiProperty({
    example: 'some text',
    required: true,
    type: String,
    minLength: COMMENT_LENGTH.MIN,
    maxLength: COMMENT_LENGTH.MAX,
  })
  @IsNotEmpty()
  @MinLength(COMMENT_LENGTH.MIN)
  @MaxLength(COMMENT_LENGTH.MAX)
  @IsString()
  public text!: string;
}
