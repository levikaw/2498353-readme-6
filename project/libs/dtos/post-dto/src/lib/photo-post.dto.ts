import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { FILEID_API_DESCRIPTION } from '@project/constants/file-constant';

export class PhotoPostDto {
  @ApiProperty({
    description: FILEID_API_DESCRIPTION,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  public fileId!: string;
}
