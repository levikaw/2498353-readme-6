import { Controller, Headers, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import 'multer';
import dayjs from 'dayjs';
import { CheckAccessGuard } from '../guards/check-access.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { POST_EXCEPTION } from '@project/constants/exception-messages';
import { ArtefactService } from '../services/artefact.service';
import { UserService } from '../services/user.service';
import { FileService } from '../services/file.service';
import { PostService } from '../services/post.service';
import { getLentaParams, renderFilePathForEntity, renderLikesCount } from '../utils';
import { NotificactionService } from '../services/notigication.service';

@UseGuards(CheckAccessGuard)
@Controller('notification')
@ApiTags('notification')
export class NotificationController {
  constructor(
    private readonly artefactService: ArtefactService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly postService: PostService,
    private readonly notificactionService: NotificactionService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'request notification for current user',
  })
  @ApiBearerAuth()
  public async requestNotify(@Headers('authorization') authHeader: string): Promise<void> {
    const lastNotifiedDateRequest = await this.notificactionService.getLastNotifiedDateByUserId(authHeader);

    const postsRequest = await this.postService.getAllPosts({ publishedAt: lastNotifiedDateRequest.date });

    const posts = postsRequest.data;

    if (posts.length === 0) {
      throw new HttpException(POST_EXCEPTION.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const { postsIds, filesIds } = getLentaParams(posts);

    const likes = await this.artefactService.getLikesCountByPostId(postsIds);

    const files = await this.fileService.getFilesPaths(filesIds);

    const publications = posts.map((post) => ({
      author: post.userId,
      title: post.name || post.text || post.link || 'New post here!',
      imagePath: renderFilePathForEntity(post.type, files, post.id),
      likeCount: renderLikesCount(likes, post.id),
      publishedAt: dayjs(post.publishedAt).format('DD.MM.YYYY'),
    }));

    return this.userService.requestNotification(publications, authHeader);
  }
}
