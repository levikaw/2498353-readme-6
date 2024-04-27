import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAccessEntity } from '@project/user-access';
import { AuthUser } from '@project/user-access';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  public async createUser(@Body(new ValidationPipe()) dto: CreateUserDto): Promise<AuthUser> {
    return this.userService.register(dto).then((resp) => resp.toObject());
  }

  // TODO: смена пароля пользователя пункт 1.9
  // TODO: запрос информации о пользователе пункт 1.10
}
