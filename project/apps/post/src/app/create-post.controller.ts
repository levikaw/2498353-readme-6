import { Body, Controller, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LinkPost, PhotoPost, PostAccessEntity, QuotePost, TextPost, VideoPost } from '@project/post-access';
import { PostService } from './post.service';
import { CreateLinkPostDto } from './dto/link-post.dto';
import { CreatePhotoPostDto } from './dto/photo-post.dto';
import { CreateQuotePostDto } from './dto/quote-post.dto';
import { CreateTextPostDto } from './dto/text-post.dto';
import { CreateVideoPostDto } from './dto/video-post.dto';

@ApiTags('create-post')
@Controller('create-post')
export class CreatePostController {
  constructor(private readonly postService: PostService) {}

  @Post('video/:userId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createVideoPost(
    @Body(new ValidationPipe()) dto: CreateVideoPostDto,
    @Param('userId') userId: string,
  ): Promise<VideoPost> {
    return this.postService.createPost(dto, userId).then((resp) => resp.toVideoObject());
  }

  @Post('text/:userId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createTextPost(
    @Body(new ValidationPipe()) dto: CreateTextPostDto,
    @Param('userId') userId: string,
  ): Promise<TextPost> {
    return this.postService.createPost(dto, userId).then((resp) => resp.toTextObject());
  }

  @Post('photo/:userId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createPhotoPost(
    @Body(new ValidationPipe()) dto: CreatePhotoPostDto,
    @Param('userId') userId: string,
  ): Promise<PhotoPost> {
    return this.postService.createPost(dto, userId).then((resp) => resp.toPhotoObject());
  }

  @Post('link/:userId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createLinkPost(
    @Body(new ValidationPipe()) dto: CreateLinkPostDto,
    @Param('userId') userId: string,
  ): Promise<LinkPost> {
    return this.postService.createPost(dto, userId).then((resp) => resp.toLinkObject());
  }

  @Post('quote/:userId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  public async createQuotePost(
    @Body(new ValidationPipe()) dto: CreateQuotePostDto,
    @Param('userId') userId: string,
  ): Promise<QuotePost> {
    return this.postService.createPost(dto, userId).then((resp) => resp.toQuoteObject());
  }
}
