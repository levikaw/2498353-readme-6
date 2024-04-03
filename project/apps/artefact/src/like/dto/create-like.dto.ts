import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
