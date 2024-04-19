import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentAccessEntity, Commentary } from '@project/comment-access';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [CommentAccessEntity],
    isArray: true,
  })
  @Get('/:postId')
  public async getCommentsByPostId(@Param('postId', ParseUUIDPipe) postId: string): Promise<Commentary[]> {
    return this.commentService.findCommentsByPostId(postId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create/:postId')
  public async createCommentByPostId(
    @Body(new ValidationPipe()) dto: CreateCommentDto,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<Commentary> {
    return this.commentService.createCommentByPostId(dto, postId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete('delete/:id')
  public async deleteCommentById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.commentService.deleteCommentById(id);
    } catch (error) {
      Logger.error(error, `deleteCommentById - id: ${id}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
