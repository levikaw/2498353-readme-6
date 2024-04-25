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
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentAccessEntity, Commentary } from '@project/comment-access';
import { QueryParamsDto, SuccessResponse } from '@project/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ResponseInterceptor } from '@project/common';

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
  @UseInterceptors(ResponseInterceptor<Commentary[]>)
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() params?: QueryParamsDto<Commentary>,
  ): Promise<SuccessResponse<Commentary[]>> {
    params.filter['postId'] = postId;
    return Promise.all([this.commentService.findCommentsByPostId(params), this.commentService.countBy(params?.filter)]).then(
      (resp) => new SuccessResponse(resp),
    );
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
