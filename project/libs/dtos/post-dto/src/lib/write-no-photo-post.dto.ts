import { PostTypeEnum } from '@project/post-access';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { LinkPostDto } from './link-post.dto';
import { QuotePostDto } from './quote-post.dto';
import { TextPostDto } from './text-post.dto';
import { VideoPostDto } from './video-post.dto';
import { TagsDto } from '@project/dtos/artefact-dto';
import { ApiProperty } from '@nestjs/swagger';

enum NoPhotoPostType {
  Video = 'video',
  Text = 'text',
  Link = 'link',
  Quote = 'quote',
}

export class WriteNoPhotoPostDto extends TagsDto {
  @IsEnum(NoPhotoPostType)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: NoPhotoPostType,
  })
  public type!: NoPhotoPostType;

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
