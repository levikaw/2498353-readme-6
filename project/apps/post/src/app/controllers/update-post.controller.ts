import { Body, Controller, HttpException, HttpStatus, Logger, Param, ParseUUIDPipe, Put, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostAccessEntity } from '@project/post-access';
import { PostService } from '../post.service';
import { LinkPostDto } from '../dto/link-post.dto';
import { PhotoPostDto } from '../dto/photo-post.dto';
import { QuotePostDto } from '../dto/quote-post.dto';
import { TextPostDto } from '../dto/text-post.dto';
import { VideoPostDto } from '../dto/video-post.dto';

@ApiTags('update-post')
@Controller('update-post')
export class UpdatePostController {
  constructor(private readonly postService: PostService) {}

  @Put('video/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updateVideoPost(
    @Body(new ValidationPipe()) dto: VideoPostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    try {
      await this.postService.updatePostById({ ...dto, id: postId });
    } catch (error) {
      Logger.error(error, `updateVideoPost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Put('text/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updateTextPost(
    @Body(new ValidationPipe()) dto: TextPostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    try {
      await this.postService.updatePostById({ ...dto, id: postId });
    } catch (error) {
      Logger.error(error, `updateTextPost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Put('photo/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updatePhotoPost(
    @Body(new ValidationPipe()) dto: PhotoPostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    try {
      await this.postService.updatePostById({ ...dto, id: postId });
    } catch (error) {
      Logger.error(error, `updatePhotoPost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Put('link/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updateLinkPost(
    @Body(new ValidationPipe()) dto: LinkPostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    try {
      await this.postService.updatePostById({ ...dto, id: postId });
    } catch (error) {
      Logger.error(error, `updateLinkPost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Put('quote/:postId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updateQuotePost(
    @Body(new ValidationPipe()) dto: QuotePostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    try {
      await this.postService.updatePostById({ ...dto, id: postId });
    } catch (error) {
      Logger.error(error, `updateQuotePost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
