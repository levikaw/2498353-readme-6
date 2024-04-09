import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAccessEntity } from '@project/user-access';
import { AuthUser } from '@project/user-access';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    description: 'Создание пользователя',
    required: true,
    isArray: false,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto): Promise<AuthUser> {
    const newUser = await this.authService.register(dto);
    return newUser.toObject();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: '{ token: string }',
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiBody({
    description: 'Аутентификация пользователя',
    required: true,
    isArray: false,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<{ token: string }> {
    const token = await this.authService.authUser(dto);
    return token;
  }
}
