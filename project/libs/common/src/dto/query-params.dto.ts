import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJSON, IsOptional, Max, Min } from 'class-validator';
import { PAGE_API, LIMIT_API } from '@project/constants';
import { Transform, Type } from 'class-transformer';

export class QueryParamsDto<T> {
  @ApiProperty({
    minimum: PAGE_API.MIN,
    default: PAGE_API.DEFAULT,
  })
  @IsInt()
  @Min(PAGE_API.MIN)
  @Type(() => Number)
  @IsOptional()
  readonly page?: number = PAGE_API.DEFAULT;

  @ApiProperty({
    minimum: LIMIT_API.MIN,
    maximum: LIMIT_API.MAX,
  })
  @IsInt()
  @Min(LIMIT_API.MIN)
  @Max(LIMIT_API.MAX)
  @Type(() => Number)
  @IsOptional()
  readonly limit?: number;

  //TODO: typecheck
  @ApiProperty({ required: false, isArray: false, type: String, example: '{ "name": "john" }' })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  public filter?: Partial<Omit<T, 'id'>> = {};

  //TODO: typecheck
  @ApiProperty({ required: false, isArray: false, type: String, example: '{ "name": "desc" }' })
  @Transform(({ value }) => JSON.parse(value))
  public sort?: Partial<Record<keyof T, 'asc' | 'desc'>>;
}
