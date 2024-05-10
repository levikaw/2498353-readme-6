import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_PASSWORD } from '@project/constants/user-constant';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

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
