import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeAccessEntity, UserLike } from '@project/like-access';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  /**
   * Получение лайков по идентификатору публикации
   * @param {string} postId
   * @returns {Promise<LikeAccessEntity[]>}
   */
  @ApiResponse({
    status: HttpStatus.OK,
    type: [LikeAccessEntity],
    isArray: true,
  })
  @Get(':postId')
  public async get(@Param('postId') postId: string): Promise<UserLike[]> {
    return await this.likeService.find(postId);
  }

  /**
   * Создание лайка для публикации
   * @param {CreateLikeDto} dto
   * @returns {Promise<UserLike>}
   */
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LikeAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create')
  public async create(@Body(new ValidationPipe()) dto: CreateLikeDto): Promise<UserLike> {
    return await this.likeService.create(dto);
  }

  /**
   * Удаление лайка по идентификатору публикации и пользователя
   * @param {string} postId
   * @param {string} userId
   */
  @ApiResponse({
    status: HttpStatus.OK,
  })
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:postId/:userId')
  public async delete(@Param('postId') postId: string, @Param('userId') userId: string): Promise<void> {
    await this.likeService.delete(postId, userId);
  }
}
