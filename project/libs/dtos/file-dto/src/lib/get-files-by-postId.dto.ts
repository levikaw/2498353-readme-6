import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class GetFilesByEntityIdDto {
  @ApiProperty({
    description:
      'entity identificator. Post or user, for example (does not participate search, used only for know relation after get files)',
  })
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @ApiProperty({
    description: 'file identificator',
  })
  @IsNotEmpty()
  @IsMongoId()
  public fileId!: string;
}
