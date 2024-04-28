import { IsArray, IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { PostsListDto } from './posts-list.dto';
import { Type } from 'class-transformer';

export class RequestNotifyDto {
  @IsNotEmpty()
  @IsString()
  public login!: string;

  @IsNotEmpty()
  @IsString()
  public userId!: string;

  @IsNotEmpty()
  @IsDateString()
  public lastDateEmail!: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => PostsListDto)
  public posts: PostsListDto[];
}
