import { UserRoleEnum } from '@project/user-access';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class TokenUserDto {
  @Expose()
  @IsUUID()
  public userId!: string;

  @Expose()
  @IsUUID()
  public refreshTokenId!: string;

  @Expose()
  @IsEmail()
  public email!: string;

  @Expose()
  @IsString()
  public userName!: string;

  @Expose()
  @IsString()
  public role!: UserRoleEnum;

  @Expose()
  @IsString()
  public avatar!: string;
}
