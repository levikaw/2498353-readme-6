import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
  Headers,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentUserFromToken, PaginationResponseDto } from '@project/common';
import {
  CommonPostDto,
  WriteNoPhotoPostDto,
  PostCatalogDto,
  QueryPostCatalogDto,
  PostDetailDto,
  WritePostDto,
  UpdateNoPhotoPostDto,
  UpdatePostDto,
} from '@project/dtos/post-dto';
import { CheckAccessGuard } from '../guards/check-access.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '@project/constants/file-constant';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/post-access';
import { NullableEnum } from '@project/common';
import { plainToInstance } from 'class-transformer';
import { ArtefactService } from '../services/artefact.service';
import { FileService } from '../services/file.service';
import { PostService } from '../services/post.service';
import { validateAndTransformTags } from '../utils';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    private readonly artefactService: ArtefactService,
    private readonly fileService: FileService,
    private readonly postService: PostService,
  ) {}

  @Get('search-by-name')
  @ApiOkResponse({
    type: PaginationResponseDto<PostCatalogDto[]>,
    isArray: false,
    description: 'get posts with user&artefact details',
  })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  public async getCatalogPostsByName(
    @Query('name') name: string,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PaginationResponseDto<PostCatalogDto[]>> {
    return await this.postService.createLenta(
      {
        name,
        publishedAt: NullableEnum.IsNotNull,
      },
      null,
      null,
      20,
      page,
    );
  }

  @Get('catalog')
  @ApiOkResponse({
    type: PaginationResponseDto<PostCatalogDto[]>,
    isArray: false,
    description: 'get posts with user&artefact details',
  })
  @ApiQuery({
    required: false,
    type: QueryPostCatalogDto,
  })
  public async getCatalogPosts(@Query() params: QueryPostCatalogDto): Promise<PaginationResponseDto<PostCatalogDto[]>> {
    return await this.postService.createLenta(
      {
        type: params.type,
        userId: [params.userId],
        publishedAt: NullableEnum.IsNotNull,
      },
      params.sort,
      params.tag,
      25,
      params.page,
    );
  }

  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @Get('lenta')
  @ApiQuery({
    required: false,
    type: QueryPostCatalogDto,
  })
  @ApiOkResponse({
    type: PaginationResponseDto<PostCatalogDto[]>,
    isArray: false,
    description: 'get posts with user&artefact details',
  })
  public async getMyCatalogPosts(
    @Query() params: QueryPostCatalogDto,
    @CurrentUserFromToken() user: TokenUserDto,
  ): Promise<PaginationResponseDto<PostCatalogDto[]>> {
    const usersIdsForPosts: string[] = [user.userId];

    const cstedIsNeedMySketch = params.isNeedMySketch === ' true';
    if (cstedIsNeedMySketch) {
      const subscriptions = await this.artefactService.getSubscriptionsByUserId(user.userId);

      usersIdsForPosts.push(...subscriptions.map(({ followingUserId }) => followingUserId));
    }

    return await this.postService.createLenta(
      {
        type: params.type,
        userId: usersIdsForPosts,
        publishedAt: cstedIsNeedMySketch ? NullableEnum.IsNull : NullableEnum.IsNotNull,
      },
      params.sort,
      params.tag,
      25,
      params.page,
    );
  }

  @Get(':postId')
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiOkResponse({
    type: CommonPostDto,
    isArray: false,
    description: 'get post details',
  })
  public async getPostDetail(@Param('postId') postId: string): Promise<PostDetailDto> {
    const post = await this.postService.getPostById(postId);

    let imagePath: string;
    if (post.type === PostTypeEnum.Photo) {
      const files = await this.fileService.getFilesPaths([{ id: post.id, fileId: post.fileId }]);

      imagePath = files.baseUrl + files.data[0]?.filePath;
    }

    const tags = await this.artefactService.getTagsByPostsIds([post.id]);

    return { ...post, imagePath, tags: tags.map(({ name, id }) => ({ name, id })) };
  }

  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiOkResponse({
    description: 'delete post by postId',
  })
  public async deletePost(@Headers('authorization') authHeader: string, @Param('id') id: string): Promise<void> {
    return this.postService.deletePostById(id, authHeader);
  }

  @UseGuards(CheckAccessGuard)
  @Post('photo')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_FILE_SIZE,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        tags: {
          type: 'string',
          description: 'tags are separated by commas',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'create post with photo',
    isArray: false,
    type: CommonPostDto,
  })
  public async createPhotoPosts(
    @Body() body: { tags: string },
    @Headers('authorization') authHeader: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CommonPostDto> {
    const tagsBody = await validateAndTransformTags(body.tags);

    const fileId = await this.fileService.upload(file, authHeader);

    const createdPpost = await this.postService.createPost(
      {
        type: PostTypeEnum.Photo,
        photo: { fileId },
      },
      authHeader,
    );

    await this.artefactService.createTags(createdPpost.id, authHeader, tagsBody.tags);

    return createdPpost;
  }

  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({
    required: true,
    type: WriteNoPhotoPostDto,
    isArray: false,
  })
  @ApiOkResponse({
    description: 'create post withot photo',
    isArray: false,
    type: CommonPostDto,
  })
  public async createNoPhotoPosts(
    @Headers('authorization') authHeader: string,
    @Body() post: WriteNoPhotoPostDto,
  ): Promise<CommonPostDto> {
    const { tags, ...postBody } = post;

    const completedPostBody = plainToInstance(WritePostDto, postBody);
    const createdPpost = await this.postService.createPost(completedPostBody, authHeader);

    await this.artefactService.createTags(createdPpost.id, authHeader, tags);

    return createdPpost;
  }

  @UseGuards(CheckAccessGuard)
  @Patch('photo/:postId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiOkResponse({
    description: 'update post with photo',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        tags: {
          type: 'string',
          description: 'tags are separated by commas',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_FILE_SIZE,
      },
    }),
  )
  public async updatePhotoPosts(
    @Body() body: { tags: string },
    @Headers('authorization') authHeader: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    const tagsBody = await validateAndTransformTags(body.tags);

    const fileId = await this.fileService.upload(file, authHeader);

    const updatedPost = await this.postService.updatePost(
      postId,
      {
        type: PostTypeEnum.Photo,
        photo: { fileId },
      },
      authHeader,
    );

    await this.artefactService.createTags(updatedPost.id, authHeader, tagsBody.tags);

    return;
  }

  @UseGuards(CheckAccessGuard)
  @ApiBearerAuth()
  @Patch('/:postId')
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiOkResponse({
    description: 'update post without photo',
  })
  public async updateNoPhotoPosts(
    @Headers('authorization') authHeader: string,
    @Param('postId') postId: string,
    @Body() post: UpdateNoPhotoPostDto,
  ): Promise<void> {
    const { tags, ...postBody } = post;

    const completedPostBody = plainToInstance(UpdatePostDto, postBody);
    const updatedPost = await this.postService.updatePost(postId, completedPostBody, authHeader);

    await this.artefactService.createTags(updatedPost.id, authHeader, tags);

    return;
  }

  @UseGuards(CheckAccessGuard)
  @Post('repost/:postId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiOkResponse({
    type: CommonPostDto,
    isArray: false,
    description: 'do repost and return new post',
  })
  public async rePosts(@Headers('authorization') authHeader: string, @Param('postId') postId: string): Promise<CommonPostDto> {
    const post = await this.postService.doRePost(postId, authHeader);

    await this.artefactService.copyTags(postId, post.id, authHeader);

    return post;
  }
}
