import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USERID_API } from '@project/constants';

export class CreateSubscriptionDto {
  @ApiProperty(USERID_API)
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: `${USERID_API.description} (who is object subscription)`,
    example: USERID_API.example,
  })
  @IsNotEmpty()
  @IsUUID()
  followedUserId!: string;
}
