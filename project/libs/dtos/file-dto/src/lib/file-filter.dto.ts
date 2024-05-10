import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { GetFilesByEntityIdDto } from './get-files-by-postId.dto';

export class QueryFileDto {
  @ApiProperty({
    required: true,
    isArray: true,
    type: GetFilesByEntityIdDto,
    description: 'filter for search files',
    example: { id: 'id', fileId: 'fileId' },
  })
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested({ each: true })
  @Type(() => GetFilesByEntityIdDto)
  public filter!: GetFilesByEntityIdDto[];
}
