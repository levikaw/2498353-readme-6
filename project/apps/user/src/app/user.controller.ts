import { Body, Controller, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAccessEntity } from '@project/user-access';
import { AuthUser } from '@project/user-access';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsListDto } from '@project/common';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: @useGuards()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserAccessEntity,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiBody({
    required: true,
    isArray: false,
  })
  @Post('register')
  public async createUser(@Body() dto: CreateUserDto): Promise<AuthUser> {
    // TODO: при создании пользователя нужна запись в Notification
    return this.userService.register(dto).then((resp) => resp.toObject());
  }

  // TODO: смена пароля пользователя пункт 1.9
  // TODO: запрос информации о пользователе пункт 1.10

  @ApiOkResponse()
  @ApiBody({
    required: true,
    type: PostsListDto,
    isArray: true,
  })
  @Post('request-notify/:userId')
  public async requestNotify(@Param('userId', ParseUUIDPipe) userId: string, @Body() posts: PostsListDto[]): Promise<void> {
    return await this.userService.requestNewPublicationsForEmail(userId, posts);
  }
}
