import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import 'multer';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public login!: string;

  @ApiProperty()
  @IsOptional()
  public avatar?: Express.Multer.File;

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
      message: `Password is not strong enough. Must contain 6-12 characters`,
    },
  )
  public password!: string;
}
