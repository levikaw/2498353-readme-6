import { IsNotEmpty, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ArtefactDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  public userId!: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  public postId!: string;
}
