import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POSTID_API, USERID_API } from '@project/constants';

export class CreateLikeDto {
  @ApiProperty({
    description: USERID_API.DESCRIPTION,
    example: USERID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @ApiProperty({
    description: POSTID_API.DESCRIPTION,
    example: POSTID_API.EXAMPLE,
  })
  @IsNotEmpty()
  @IsUUID()
  public postId!: string;
}
