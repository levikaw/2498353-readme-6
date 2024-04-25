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
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeAccessEntity, UserLike } from '@project/like-access';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { QueryParamsDto, SuccessResponse } from '@project/common';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [LikeAccessEntity],
    isArray: true,
  })
  @Get('/:postId')
  public async getLikeByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() params?: QueryParamsDto<UserLike>,
  ): Promise<SuccessResponse<UserLike[]>> {
    params.filter['postId'] = postId;
    return Promise.all([this.likeService.findLikeByPostId(params), this.likeService.countBy(params?.filter)]).then(
      (resp) => new SuccessResponse(resp),
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LikeAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @Post('create')
  public async createLike(@Body(new ValidationPipe()) dto: CreateLikeDto): Promise<UserLike> {
    return this.likeService.createLike(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  // TODO: сделать получение id текущего авторизованного пользователя
  @Delete('delete/:postId/:userId')
  public async deleteLikeByPostIdUserId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    try {
      await this.likeService.deleteLikeByPostIdUserId(postId, userId);
    } catch (error) {
      Logger.error(error, `postId: ${postId}, userId: ${userId}`);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
