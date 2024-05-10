import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationResponseDto<T extends Array<any>> {
  @Expose()
  @IsNotEmpty()
  data!: T;

  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  total!: number;
}
