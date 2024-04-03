import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: PostAccessEntity })
  public async createVideoPost(
    @Body(new ValidationPipe()) dto: CreateVideoPostDto,
    @Param('userId') userId: string,
  ): Promise<VideoPost> {
    return await this.postService.createPost(dto, userId);
  }

  @Post('text/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createTextPost(
    @Body(new ValidationPipe()) dto: CreateTextPostDto,
    @Param('userId') userId: string,
  ): Promise<TextPost> {
    return await this.postService.createPost(dto, userId);
  }

  @Post('photo/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createPhotoPost(
    @Body(new ValidationPipe()) dto: CreatePhotoPostDto,
    @Param('userId') userId: string,
  ): Promise<PhotoPost> {
    return await this.postService.createPost(dto, userId);
  }

  @Post('link/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createLinkPost(
    @Body(new ValidationPipe()) dto: CreateLinkPostDto,
    @Param('userId') userId: string,
  ): Promise<LinkPost> {
    return await this.postService.createPost(dto, userId);
  }

  @Post('quote/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createQuotePost(
    @Body(new ValidationPipe()) dto: CreateQuotePostDto,
    @Param('userId') userId: string,
  ): Promise<QuotePost> {
    return await this.postService.createPost(dto, userId);
  }
}
