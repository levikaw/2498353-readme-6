import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POSTID_API, USERID_API } from '@project/constants';

export class CreateLikeDto {
  @ApiProperty(USERID_API)
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty(POSTID_API)
  @IsNotEmpty()
  @IsUUID()
  public postId!: string;
}
