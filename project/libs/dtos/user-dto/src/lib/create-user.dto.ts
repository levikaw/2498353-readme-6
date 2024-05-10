import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_PASSWORD, USERID_API, LENGTH_USER_NAME } from '@project/constants/user-constant';
import { FILEID_API_DESCRIPTION } from '@project/constants/file-constant';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: USERID_API.DESCRIPTION,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  public id?: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: LENGTH_USER_NAME.MIN,
    maxLength: LENGTH_USER_NAME.MAX,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(LENGTH_USER_NAME.MIN)
  @MaxLength(LENGTH_USER_NAME.MAX)
  public userName!: string;

  @ApiProperty({
    description: FILEID_API_DESCRIPTION,
    type: String,
    required: true,
  })
  @IsOptional()
  @IsMongoId()
  public avatar?: string;

  @ApiProperty({
    minLength: LENGTH_PASSWORD.MIN,
    maxLength: LENGTH_PASSWORD.MAX,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(LENGTH_PASSWORD.MIN)
  @MaxLength(LENGTH_PASSWORD.MAX)
  @IsStrongPassword({ minLength: LENGTH_PASSWORD.MIN })
  public password!: string;
}
