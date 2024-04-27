import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LinkPost, PhotoPost, PostAccessEntity, QuotePost, TextPost, VideoPost } from '@project/post-access';
import { PostService } from '../post.service';
import { LinkPostDto } from '../dto/link-post.dto';
import { PhotoPostDto } from '../dto/photo-post.dto';
import { QuotePostDto } from '../dto/quote-post.dto';
import { TextPostDto } from '../dto/text-post.dto';
import { VideoPostDto } from '../dto/video-post.dto';
import { PostType } from '@prisma/client';

@ApiTags('create-post')
@Controller('create-post')
export class CreatePostController {
  constructor(private readonly postService: PostService) {}

  @Post('video')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createVideoPost(@Body(new ValidationPipe()) dto: VideoPostDto): Promise<VideoPost> {
    return this.postService.createPost({ type: PostType.video, ...dto }).then((resp) => resp.toVideoObject());
  }

  @Post('text')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createTextPost(@Body(new ValidationPipe()) dto: TextPostDto): Promise<TextPost> {
    return this.postService.createPost({ type: PostType.text, ...dto }).then((resp) => resp.toTextObject());
  }

  @Post('photo')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createPhotoPost(@Body(new ValidationPipe()) dto: PhotoPostDto): Promise<PhotoPost> {
    return this.postService.createPost({ type: PostType.photo, ...dto }).then((resp) => resp.toPhotoObject());
  }

  @Post('link')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createLinkPost(@Body(new ValidationPipe()) dto: LinkPostDto): Promise<LinkPost> {
    return this.postService.createPost({ type: PostType.link, ...dto }).then((resp) => resp.toLinkObject());
  }

  @Post('quote')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createQuotePost(@Body(new ValidationPipe()) dto: QuotePostDto): Promise<QuotePost> {
    return this.postService.createPost({ type: PostType.quote, ...dto }).then((resp) => resp.toQuoteObject());
  }
}
