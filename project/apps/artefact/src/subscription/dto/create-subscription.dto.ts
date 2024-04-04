import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  followUserId!: string;
}
