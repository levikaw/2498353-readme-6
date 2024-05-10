import { TAG_LENGTH } from '@project/constants/comment-constant';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(TAG_LENGTH.MIN)
  @MaxLength(TAG_LENGTH.MAX)
  @Matches(/^([a-z,A-Z])\w+/g, { message: 'tag name must starts with letter' })
  @Transform(({ value }) => value.toLowerCase())
  public name!: string;

  @IsUUID()
  @IsNotEmpty()
  public id!: string;
}
