import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import 'multer';
import {
  FAIL_PASSWORD_VALIDATION,
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
} from '@project/constants';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.mail',
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User login',
    example: 'user_login',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_LOGIN)
  @MaxLength(MAX_LENGTH_LOGIN)
  public login!: string;

  @ApiProperty({
    description: 'Avatar',
  })
  @IsOptional()
  public avatar?: Express.Multer.File;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsStrongPassword(
    {
      minLength: MIN_LENGTH_PASSWORD,
    },
    {
      message: FAIL_PASSWORD_VALIDATION,
    },
  )
  public password!: string;
}
