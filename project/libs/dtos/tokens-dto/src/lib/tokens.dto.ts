import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class TokensDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  public accessToken!: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  public refreshToken!: string;
}
