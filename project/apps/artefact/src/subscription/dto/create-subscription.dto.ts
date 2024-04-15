import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USERID_API } from '@project/constants';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: USERID_API.DESCRIPTION,
    example: USERID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty({
    description: `${USERID_API.DESCRIPTION} (who is object subscription)`,
    example: USERID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public followedUserId!: string;
}
