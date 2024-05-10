import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Headers, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CommentDto, CreateCommentDto, SubscriptionDto, ArtefactDto } from '@project/dtos/artefact-dto';
import { CheckAccessGuard } from '../guards/check-access.guard';
import { PaginationResponseDto } from '@project/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ArtefactService } from '../services/artefact.service';

@ApiTags('artefact')
@Controller('artefact')
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @Get('comment/:postId/:page')
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiParam({
    name: 'page',
    required: true,
    type: Number,
    description: 'page number for pagination',
  })
  @ApiOkResponse({
    type: PaginationResponseDto<CommentDto[]>,
    isArray: false,
    description: 'get comments by postId. Support pagination',
  })
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('page', ParseIntPipe) page: number,
  ): Promise<PaginationResponseDto<CommentDto[]>> {
    return this.artefactService.getCommentsByPostId(postId, page);
  }

  @UseGuards(CheckAccessGuard)
  @Post('comment/:postId')
  @ApiBody({
    required: true,
    isArray: false,
    type: CreateCommentDto,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create comment by postId',
    isArray: false,
    type: CommentDto,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  public async createCommentByPostId(
    @Body() comment: CreateCommentDto,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Headers('authorization') authHeader: string,
  ): Promise<CommentDto> {
    return this.artefactService.createCommentByPostId(comment, postId, authHeader);
  }

  @UseGuards(CheckAccessGuard)
  @Delete('comment/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'delete comment by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'comment id',
  })
  public async deleteCommentById(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authHeader: string,
  ): Promise<void> {
    return this.artefactService.deleteCommentById(id, authHeader);
  }

  @Post('like/:postId')
  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create like by postId',
    isArray: false,
    type: ArtefactDto,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  public async createLike(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Headers('authorization') authHeader: string,
  ): Promise<ArtefactDto> {
    return this.artefactService.createLike(postId, authHeader);
  }

  @Delete('like/:id')
  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'delete like by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'like id',
  })
  public async deleteLikeById(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authHeader: string,
  ): Promise<void> {
    return this.artefactService.deleteLikeById(id, authHeader);
  }

  @Post('subscription/:followingUserId')
  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'create and return subscription',
    type: SubscriptionDto,
    isArray: false,
  })
  @ApiParam({
    name: 'followingUserId',
    required: true,
    type: String,
    description: 'followed user id',
  })
  public async createSubscription(
    @Param('followingUserId', ParseUUIDPipe) followingUserId: string,
    @Headers('authorization') authHeader: string,
  ): Promise<SubscriptionDto> {
    return this.artefactService.createSubscription(followingUserId, authHeader);
  }

  @Delete('subscription/:id')
  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'delete subscription by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'subscription id',
  })
  public async deleteSubscription(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authHeader: string,
  ): Promise<void> {
    return this.artefactService.deleteSubscription(id, authHeader);
  }
}
