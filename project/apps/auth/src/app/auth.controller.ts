import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard, SuccessResponse } from '@project/common';
import { User } from '@project/user-access';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: '{ token: string }',
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiBody({
    required: true,
    isArray: false,
  })
  @Post('login')
  public async login(
    @Body(new ValidationPipe()) dto: LoginUserDto,
  ): Promise<SuccessResponse<{ user: User; accessToken: string }>> {
    try {
      const user = await this.authService.authUser(dto);
      delete user.passwordHash;
      const accessToken = await this.authService.getAuthToken(user);
      return new SuccessResponse({ user, accessToken });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  public async checkAuth() {
    console.log('yeah');
  }
}
