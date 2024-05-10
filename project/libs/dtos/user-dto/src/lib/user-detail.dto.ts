import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AuthUserDto } from './auth-user.dto';

export class UserDetailDto extends AuthUserDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  public postCount!: number;

  @Expose()
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  public subscriptionCount!: number;
}
