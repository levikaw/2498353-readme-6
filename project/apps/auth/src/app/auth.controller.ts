import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserAccountEntity } from '@project/account';
import { AuthUser } from '@project/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: @useGuards()
  @ApiOkResponse({ type: UserAccountEntity })
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

  @ApiOkResponse({ type: '{ token: string }' })
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
