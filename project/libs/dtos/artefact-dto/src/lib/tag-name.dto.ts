import { ApiProperty } from '@nestjs/swagger';
import { TAG_LENGTH } from '@project/constants/comment-constant';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class TagNameDto {
  @ApiProperty({
    description: 'tag name, e.g. tag',
    minLength: TAG_LENGTH.MIN,
    maxLength: TAG_LENGTH.MAX,
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(TAG_LENGTH.MIN)
  @MaxLength(TAG_LENGTH.MAX)
  @Matches(/^([a-z,A-Z])\w+/g, { message: 'tag name must starts with letter' })
  @Transform(({ value }) => value.toLowerCase())
  public name!: string;
}
