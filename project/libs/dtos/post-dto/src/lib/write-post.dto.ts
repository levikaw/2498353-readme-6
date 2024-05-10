import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/post-access';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { LinkPostDto } from './link-post.dto';
import { PhotoPostDto } from './photo-post.dto';
import { QuotePostDto } from './quote-post.dto';
import { TextPostDto } from './text-post.dto';
import { VideoPostDto } from './video-post.dto';

export class WritePostDto {
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
    type: VideoPostDto,
    description: 'video post',
    example: { name: 'name', link: 'https://youtube.com' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Video)
  @Type(() => VideoPostDto)
  @ValidateNested()
  public video?: VideoPostDto;

  @ApiProperty({
    required: false,
    type: TextPostDto,
    description: 'text post',
    example: { name: 'name', text: 'text', announcement: 'announcement' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Text)
  @Type(() => TextPostDto)
  @ValidateNested()
  public text?: TextPostDto;

  @ApiProperty({
    required: false,
    type: LinkPostDto,
    description: 'link post',
    example: { text: 'text', link: 'https://some.link' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Link)
  @Type(() => LinkPostDto)
  @ValidateNested()
  public link?: LinkPostDto;

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
    type: QuotePostDto,
    description: 'quote post',
    example: { text: 'text', author: 'author' },
  })
  @IsOptional()
  @ValidateIf((post) => post.type === PostTypeEnum.Quote)
  @Type(() => QuotePostDto)
  @ValidateNested()
  public quote?: QuotePostDto;
}
