import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
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
    description: 'Create user',
    required: true,
    isArray: false,
  })
  @Post('register')
  public async createUser(@Body() dto: CreateUserDto): Promise<AuthUser> {
    const newUser = await this.userService.register(dto);
    return newUser.toObject();
  }
}
