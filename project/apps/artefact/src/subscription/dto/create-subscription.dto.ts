import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'User identificator (who create subscription)',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'User identificator (who is object subscription)',
    example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
  })
  @IsNotEmpty()
  @IsUUID()
  followedUserId!: string;
}
