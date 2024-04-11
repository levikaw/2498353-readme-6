import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
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
  @Get(':postId')
  public async getCommentByPostId(@Param('postId') postId: string): Promise<Commentary[]> {
    return this.commentService.findCommentByPostId(postId);
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
    @Param('postId') postId: string,
  ): Promise<Commentary> {
    return this.commentService.createCommentByPostId(dto, postId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete('delete/:id')
  public async deleteCommentById(@Param('id') id: string): Promise<void> {
    this.commentService.deleteCommentById(id);
  }
}
