import { IsNotEmpty, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  public dateBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string;
}
