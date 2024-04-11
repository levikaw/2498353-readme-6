import { Body, Controller, Delete, Get, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeAccessEntity, UserLike } from '@project/like-access';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [LikeAccessEntity],
    isArray: true,
  })
  @Get(':postId')
  public async getLikeByPostId(@Param('postId') postId: string): Promise<UserLike[]> {
    return this.likeService.findLikeByPostId(postId);
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
  public async deleteLikeByPostIdUserId(@Param('postId') postId: string, @Param('userId') userId: string): Promise<void> {
    this.likeService.deleteLikeByPostIdUserId(postId, userId);
  }
}
