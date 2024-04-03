import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: [LikeAccessEntity] })
  @Get(':postId')
  public async get(@Param('postId') postId: string): Promise<UserLike[]> {
    return await this.likeService.find(postId);
  }

  /**
   * Создание лайка для публикации
   * @param {CreateLikeDto} dto
   * @returns {Promise<UserLike>}
   */
  @ApiOkResponse({ type: LikeAccessEntity })
  @Post('create')
  public async create(@Body(new ValidationPipe()) dto: CreateLikeDto): Promise<UserLike> {
    return await this.likeService.create(dto);
  }

  /**
   * Удаление лайка по идентификатору публикации и пользователя
   * @param {string} postId
   * @param {string} userId
   */
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:postId/:userId')
  public async delete(@Param('postId') postId: string, @Param('userId') userId: string): Promise<void> {
    await this.likeService.delete(postId, userId);
  }
}
