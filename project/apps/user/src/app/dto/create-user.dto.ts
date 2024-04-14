import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import 'multer';
import { EMAIL_API, FAIL_PASSWORD_VALIDATION, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@project/constants';
import { LOGIN_API, MAX_LENGTH_LOGIN, MIN_LENGTH_LOGIN } from '../constants';

export class CreateUserDto {
  @ApiProperty(EMAIL_API)
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiProperty(LOGIN_API)
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_LOGIN)
  @MaxLength(MAX_LENGTH_LOGIN)
  public login!: string;

  @ApiProperty({
    description: 'Avatar',
  })
  @IsOptional()
  public avatar?: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsStrongPassword({ minLength: MIN_LENGTH_PASSWORD }, { message: FAIL_PASSWORD_VALIDATION })
  public password!: string;
}
