import { ApiProperty } from '@nestjs/swagger';
import { FILEID_API_DESCRIPTION } from '@project/constants/file-constant';
import { UserRoleEnum } from '@project/user-access';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AuthUserDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  public id!: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    required: true,
    type: Date,
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public userName!: string;

  @Expose()
  @ApiProperty({
    description: FILEID_API_DESCRIPTION,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public avatar!: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  public role!: UserRoleEnum;
}
