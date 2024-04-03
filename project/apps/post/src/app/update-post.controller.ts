import { Body, Controller, Param, Put, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostAccessEntity } from '@project/post-access';
import { PostService } from './post.service';
import { CreateLinkPostDto } from './dto/link-post.dto';
import { CreatePhotoPostDto } from './dto/photo-post.dto';
import { CreateQuotePostDto } from './dto/quote-post.dto';
import { CreateTextPostDto } from './dto/text-post.dto';
import { CreateVideoPostDto } from './dto/video-post.dto';

@ApiTags('update-post')
@Controller('update-post')
export class UpdatePostController {
  constructor(private readonly postService: PostService) {}

  @Put('video/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createVideoPost(
    @Body(new ValidationPipe()) dto: CreateVideoPostDto,
    @Param('postId') postId: string,
  ): Promise<void> {
    return await this.postService.updatePost(dto, postId);
  }

  @Put('text/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createTextPost(
    @Body(new ValidationPipe()) dto: CreateTextPostDto,
    @Param('postId') postId: string,
  ): Promise<void> {
    return await this.postService.updatePost(dto, postId);
  }

  @Put('photo/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createPhotoPost(
    @Body(new ValidationPipe()) dto: CreatePhotoPostDto,
    @Param('postId') postId: string,
  ): Promise<void> {
    return await this.postService.updatePost(dto, postId);
  }

  @Put('link/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createLinkPost(
    @Body(new ValidationPipe()) dto: CreateLinkPostDto,
    @Param('postId') postId: string,
  ): Promise<void> {
    return await this.postService.updatePost(dto, postId);
  }

  @Put('quote/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async createQuotePost(
    @Body(new ValidationPipe()) dto: CreateQuotePostDto,
    @Param('postId') postId: string,
  ): Promise<void> {
    return await this.postService.updatePost(dto, postId);
  }
}
