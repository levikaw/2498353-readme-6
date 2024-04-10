import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EMAIL_API, FAIL_PASSWORD_VALIDATION, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@project/constants';

export class LoginUserDto {
  @ApiProperty(EMAIL_API)
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsStrongPassword({ minLength: MIN_LENGTH_PASSWORD }, { message: FAIL_PASSWORD_VALIDATION })
  public password!: string;
}
