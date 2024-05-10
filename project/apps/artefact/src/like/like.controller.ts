import {
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { CurrentUserFromToken, JwtAuthGuard } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { ArtefactDto, ArtefactsCountDto } from '@project/dtos/artefact-dto';
import { USER_EXCEPTION } from '@project/constants/exception-messages';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOkResponse({
    type: [ArtefactsCountDto],
    isArray: true,
    description: 'likes count per post',
  })
  @Get()
  @ApiQuery({
    type: [String],
    required: true,
    description: 'array of post identificators',
  })
  public async getLikesCountByPostId(@Query('postsIds') postsIds: string[]): Promise<ArtefactsCountDto[]> {
    try {
      const countLikesByPostsTds = await Promise.all(
        postsIds.map((postId) => this.likeService.countByPostId(postId).then((count) => ({ postId, count }))),
      );
      return countLikesByPostsTds;
    } catch (error) {
      Logger.error(error);
      return postsIds.map((postId) => ({ postId, count: 0 }));
    }
  }

  @ApiOkResponse({
    type: ArtefactDto,
    isArray: false,
    description: 'create and return like',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
    description: 'post id',
  })
  public async createLike(
    @Param('postId', ParseUUIDPipe) postId: string,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<ArtefactDto> {
    try {
      return await this.likeService.createLike(postId, user.userId);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot create like', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOkResponse({
    description: 'Delete likes by id',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'like id',
  })
  public async deleteLikeById(@Param('id', ParseUUIDPipe) id: string, @CurrentUserFromToken() user: TokenUserDto): Promise<void> {
    try {
      const like = await this.likeService.findLikeById(id);
      if (like.userId !== user.userId) {
        throw new HttpException(`${USER_EXCEPTION.NOT_OWN} like`, HttpStatus.FORBIDDEN);
      }
      return await this.likeService.deleteLikeById(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot delete like', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
