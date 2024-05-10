import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostsListDto {
  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNumber()
  @IsNotEmpty()
  public likeCount: number;

  @IsDate()
  @IsNotEmpty()
  public publishedAt: Date;
}
