import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_PASSWORD } from '@project/constants/user-constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'current password',
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
  public oldPassword!: string;

  @ApiProperty({
    description: 'new password',
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
  public newPassword!: string;
}
