import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentAccessEntity, Commentary } from '@project/comment-access';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Получение комментариев по идентификатору публикации
   * @param {string} postId
   * @returns {Promise<CommentAccessEntity[]>}
   */
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CommentAccessEntity],
    isArray: true,
  })
  @Get(':postId')
  public async get(@Param('postId') postId: string): Promise<Commentary[]> {
    return await this.commentService.find(postId);
  }

  /**
   * Создание комментария для публикации
   * @param {CreateCommentDto} dto
   * @returns {Promise<any>}
   */
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create/:postId')
  public async create(@Body(new ValidationPipe()) dto: CreateCommentDto, @Param('postId') postId: string): Promise<Commentary> {
    return await this.commentService.create(dto, postId);
  }

  /**
   * Удаление комментария по идентификатору
   * @param {string} id
   */
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete('delete/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.commentService.delete(id);
  }
}
