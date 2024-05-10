import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { NotificationPostsListDto } from '@project/dtos/post-dto';
import { Type } from 'class-transformer';

export class RequestNotifyDto {
  @IsNotEmpty()
  @IsString()
  public userName!: string;

  @IsNotEmpty()
  @IsString()
  public userId!: string;

  @IsNotEmpty()
  @IsDateString()
  public lastNotificationDate!: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => NotificationPostsListDto)
  @ValidateNested({ each: true })
  public posts!: NotificationPostsListDto[];
}
