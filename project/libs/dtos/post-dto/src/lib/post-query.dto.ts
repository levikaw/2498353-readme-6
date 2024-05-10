import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PostFilterDto } from './post-filter.dto';

export class PostsQueryDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  public page = 1;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  public limit?: number;

  @ApiProperty({ required: false, isArray: false, type: PostFilterDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PostFilterDto)
  public filter?: PostFilterDto;
}
