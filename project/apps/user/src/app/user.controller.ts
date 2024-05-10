import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CheckNoAuthGuard, CurrentUserFromToken, fillDto, JwtAuthGuard } from '@project/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { CreateUserDto, ChangePasswordDto, AuthUserDto } from '@project/dtos/user-dto';
import { NotificationPostsListDto } from '@project/dtos/post-dto';
import { AUTH_EXCEPTION } from '@project/constants/exception-messages';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: AuthUserDto,
    isArray: false,
    description: 'UserInterface registration',
  })
  @ApiBody({
    required: true,
    isArray: false,
    type: CreateUserDto,
  })
  @UseGuards(CheckNoAuthGuard)
  @Post('register')
  public async createUser(@Body() user: CreateUserDto): Promise<AuthUserDto> {
    try {
      return this.userService.register(user).then((createdUser) => fillDto(AuthUserDto, createdUser.toObject()));
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
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
    @CurrentUserFromToken() user: TokenUserDto,
    @Body() passwordCredential: ChangePasswordDto,
  ): Promise<AuthUserDto> {
    try {
      const userEntity = await this.userService.changePassword(user.userId, passwordCredential);
      return fillDto(AuthUserDto, userEntity.toObject());
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(AUTH_EXCEPTION.WRONG_PASSWORD);
    }
  }

  @ApiOkResponse({
    description: 'Request notification to current user',
  })
  @ApiBody({
    required: true,
    isArray: true,
    type: [NotificationPostsListDto],
  })
  @UseGuards(JwtAuthGuard)
  @Post('request-notify')
  @ApiBearerAuth()
  public async requestNotification(
    @CurrentUserFromToken() user: TokenUserDto,
    @Body() posts: NotificationPostsListDto[],
  ): Promise<void> {
    try {
      const publications = await Promise.all(
        posts.map(
          async (post) => await this.userService.findById(post.author).then(({ userName }) => ({ ...post, author: userName })),
        ),
      );
      return await this.userService.requestNewPublicationsForEmail(user.userId, publications);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot request for notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({
    type: [AuthUserDto],
    description: 'Get users by their identificators',
    isArray: true,
  })
  @ApiQuery({
    type: [String],
    isArray: true,
    description: 'Array of user`s identicators',
  })
  public async getUsersByIds(@Query('usersIds') usersIds: string[]): Promise<AuthUserDto[]> {
    try {
      return await Promise.all(
        usersIds.map((id) => this.userService.findById(id).then((user) => fillDto(AuthUserDto, user.toObject()))),
      );
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }
}
