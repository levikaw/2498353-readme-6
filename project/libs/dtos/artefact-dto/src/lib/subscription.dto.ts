import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SubscriptionDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    description: 'the user who follows',
  })
  @IsUUID()
  @IsNotEmpty()
  public userId!: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  public id!: string;

  @Expose()
  @IsUUID()
  @ApiProperty({
    required: true,
    type: String,
    description: 'the user being followed',
  })
  @IsNotEmpty()
  public followingUserId!: string;
}
