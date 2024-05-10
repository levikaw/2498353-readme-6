import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/post-access';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { PhotoPostDto } from '../photo-post.dto';
import { UpdateLinkPostDto } from './update-link-post.dto';
import { UpdateQuotePostDto } from './update-quote-post.dto';
import { UpdateTextPostDto } from './update-text-post.dto';
import { UpdateVideoPostDto } from './update-video-post.dto';

export class UpdatePostDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'post type',
    example: 'photo',
    enum: PostTypeEnum,
  })
  @IsEnum(PostTypeEnum)
  @IsNotEmpty()
  public type!: PostTypeEnum;

  @ApiProperty({
    required: false,
    type: UpdateVideoPostDto,
    description: 'video post',
    example: { name: 'name', link: 'https://youtube.com' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Video)
  @Type(() => UpdateVideoPostDto)
  @ValidateNested()
  public video?: UpdateVideoPostDto;

  @ApiProperty({
    required: false,
    type: UpdateTextPostDto,
    description: 'text post',
    example: { name: 'name', text: 'text', announcement: 'announcement' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Text)
  @Type(() => UpdateTextPostDto)
  @ValidateNested()
  public text?: UpdateTextPostDto;

  @ApiProperty({
    required: false,
    type: UpdateLinkPostDto,
    description: 'link post',
    example: { text: 'text', link: 'https://some.link' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Link)
  @Type(() => UpdateLinkPostDto)
  @ValidateNested()
  public link?: UpdateLinkPostDto;

  @ApiProperty({
    required: false,
    type: PhotoPostDto,
    description: 'photo post',
    example: { fileId: 'fileId' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Photo)
  @Type(() => PhotoPostDto)
  @ValidateNested()
  public photo?: PhotoPostDto;

  @ApiProperty({
    required: false,
    type: UpdateQuotePostDto,
    description: 'quote post',
    example: { text: 'text', author: 'author' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Quote)
  @Type(() => UpdateQuotePostDto)
  @ValidateNested()
  public quote?: UpdateQuotePostDto;
}
