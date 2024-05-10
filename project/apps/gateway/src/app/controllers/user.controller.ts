import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Headers,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthUserDto, ChangePasswordDto, CreateUserDto, LoginUserDto, UserDetailDto } from '@project/dtos/user-dto';
import { randomUUID } from 'crypto';
import { MAX_AVATAR_SIZE, ALLOWED_FILE_TYPES } from '@project/constants/file-constant';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { CheckAccessGuard } from '../guards/check-access.guard';
import { CheckRefreshGuard } from '../guards/check-refresh.guard';
import { TokensDto } from '@project/dtos/tokens-dto';
import { CheckNoAuthGuard, fillDto } from '@project/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { USER_EXCEPTION } from '@project/constants/exception-messages';
import { ArtefactService } from '../services/artefact.service';
import { UserService } from '../services/user.service';
import { FileService } from '../services/file.service';
import { PostService } from '../services/post.service';
import { LENGTH_PASSWORD, LENGTH_USER_NAME } from '@project/constants/user-constant';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly artefactService: ArtefactService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly postService: PostService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fieldSize: MAX_AVATAR_SIZE,
      },
    }),
  )
  @ApiOkResponse({
    type: AuthUserDto,
    isArray: false,
    description: 'UserInterface registration',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'email', 'password', 'userName'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
          maxLength: LENGTH_PASSWORD.MAX,
          minLength: LENGTH_PASSWORD.MIN,
        },
        userName: {
          type: 'string',
          maxLength: LENGTH_USER_NAME.MAX,
          minLength: LENGTH_USER_NAME.MIN,
        },
      },
    },
  })
  @UseGuards(CheckNoAuthGuard)
  public async createUser(
    @Body() account: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<AuthUserDto> {
    const id = randomUUID();

    const avatar = await this.fileService.upload(file, null, id);

    return this.userService.register(account, avatar, id);
  }

  @Get('detail/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserDetailDto,
    isArray: false,
    description: 'Get user deatils with artefacts',
  })
  public async getUserDetail(@Param('userId', ParseUUIDPipe) userId: string): Promise<UserDetailDto> {
    const userRequest = await this.userService.getUsersByIds([userId]);

    if (userRequest.length === 0) {
      throw new HttpException(USER_EXCEPTION.DOES_NOT_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const [user] = userRequest;

    const postsRequest = await this.postService.getAllPosts({ userId: [user.id] });

    const subscriptions = await this.artefactService.getSubscriptionsByUserId(user.id);

    const files = await this.fileService.getFilesPaths([{ id: user.id, fileId: user.avatar }]);

    return fillDto(UserDetailDto, {
      ...user,
      postCount: postsRequest.total,
      subscriptionCount: subscriptions.length,
      avatar: files[0]?.filePath,
    });
  }

  @UseGuards(CheckAccessGuard)
  @Patch()
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    isArray: false,
    type: ChangePasswordDto,
  })
  @ApiOkResponse({
    type: AuthUserDto,
    description: 'Change user password',
    isArray: false,
  })
  public async changePassword(
    @Body() passwordCredential: ChangePasswordDto,
    @Headers('authorization') authHeader: string,
  ): Promise<AuthUserDto> {
    return this.userService.changePassword(passwordCredential, authHeader);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'Login user',
    type: TokensDto,
    isArray: false,
  })
  @ApiBody({
    required: true,
    isArray: false,
    type: LoginUserDto,
  })
  public async login(@Body() user: LoginUserDto): Promise<TokensDto> {
    return this.userService.login(user);
  }

  @UseGuards(CheckRefreshGuard)
  @Post('refresh')
  @ApiOkResponse({
    description: 'Get new tokens',
    type: TokensDto,
    isArray: false,
  })
  @ApiBearerAuth()
  public async refreshTokens(@Headers('authorization') authHeader: string): Promise<TokensDto> {
    return this.userService.refreshTokens(authHeader);
  }
}
