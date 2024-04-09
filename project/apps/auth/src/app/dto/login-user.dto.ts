import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.mail',
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @IsStrongPassword(
    {
      minLength: 6,
    },
    {
      message: `Password is not strong enough. Must contain: 8 characters, 1 number, 1 uppercase letter, 1 symbol`,
    },
  )
  public password!: string;
}
