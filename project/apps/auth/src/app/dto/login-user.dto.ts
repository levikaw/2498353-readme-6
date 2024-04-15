import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EMAIL_API, FAIL_PASSWORD_VALIDATION, LENGTH_PASSWORD } from '@project/constants';

export class LoginUserDto {
  @ApiProperty({
    description: EMAIL_API.DESCRIPTION,
    example: EMAIL_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(LENGTH_PASSWORD.MIN)
  @MaxLength(LENGTH_PASSWORD.MAX)
  @IsStrongPassword({ minLength: LENGTH_PASSWORD.MIN }, { message: FAIL_PASSWORD_VALIDATION })
  public password!: string;
}
