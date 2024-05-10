import { ApiProperty } from '@nestjs/swagger';
import { TagNameDto } from './tag-name.dto';
import { Expose, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, ValidateNested } from 'class-validator';

export class TagsDto {
  @Expose()
  @ApiProperty({
    example: [{ name: 'sometag' }],
    required: false,
    isArray: true,
    maxItems: 8,
    type: TagNameDto,
  })
  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => TagNameDto)
  @ValidateNested({ each: true })
  @ArrayMaxSize(8)
  public tags?: TagNameDto[];
}
