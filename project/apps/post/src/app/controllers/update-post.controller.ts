import { Body, Controller, HttpException, HttpStatus, Logger, Param, ParseUUIDPipe, Put, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostAccessEntity } from '@project/post-access';
import { PostService } from '../post.service';
import { LinkPostDto } from '../dto/link-post.dto';
import { PhotoPostDto } from '../dto/photo-post.dto';
import { QuotePostDto } from '../dto/quote-post.dto';
import { TextPostDto } from '../dto/text-post.dto';
import { VideoPostDto } from '../dto/video-post.dto';
import { POST_EXCEPTIONS } from '../constants';

// TODO: может сделать через validateIf
@ApiTags('update-post')
@Controller('update-post')
export class UpdatePostController {
  constructor(private readonly postService: PostService) {}

  @Put('video/:postId/:userId')
  @ApiOkResponse({ type: PostAccessEntity })
  public async updateVideoPost(
    @Body(new ValidationPipe()) dto: VideoPostDto,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId === userId) {
        return await this.postService.updatePostById({ ...dto, id: postId });
      } else {
        throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId === userId) {
        return await this.postService.updatePostById({ ...dto, id: postId });
      } else {
        throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId === userId) {
        return await this.postService.updatePostById({ ...dto, id: postId });
      } else {
        throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId === userId) {
        return await this.postService.updatePostById({ ...dto, id: postId });
      } else {
        throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
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
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      const post = await this.postService.findPostById(postId);
      if (post.userId === userId) {
        return await this.postService.updatePostById({ ...dto, id: postId });
      } else {
        throw new HttpException(POST_EXCEPTIONS.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      Logger.error(error, `updateQuotePost - postId: ${postId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
