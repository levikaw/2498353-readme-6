import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EMAIL_API, FAIL_PASSWORD_VALIDATION, LENGTH_PASSWORD } from '@project/constants';
import { LOGIN_API, LENGTH_LOGIN } from '../constants';

export class CreateUserDto {
  @ApiProperty({
    description: EMAIL_API.DESCRIPTION,
    example: EMAIL_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: LOGIN_API.DESCRIPTION,
    example: LOGIN_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(LENGTH_LOGIN.MIN)
  @MaxLength(LENGTH_LOGIN.MAX)
  public login!: string;

  @ApiProperty({
    description: 'file identificator for avatar uploaded on /api/file/avatar',
  })
  @IsOptional()
  public avatar?: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(LENGTH_PASSWORD.MIN)
  @MaxLength(LENGTH_PASSWORD.MAX)
  @IsStrongPassword({ minLength: LENGTH_PASSWORD.MIN }, { message: FAIL_PASSWORD_VALIDATION })
  public password!: string;
}
