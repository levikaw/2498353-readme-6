import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard, RefreshTokenGuard, SuccessResponse } from '@project/common';
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
  ): Promise<SuccessResponse<{ user: User; accessToken: string; refreshToken: string }>> {
    try {
      const user = await this.authService.authUser(dto);
      delete user.passwordHash;
      const tokens = await this.authService.getTokens(user);
      await this.authService.updateRefreshToken(user.id, tokens.refreshToken);
      return new SuccessResponse({ user, ...tokens });
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

  @UseGuards(RefreshTokenGuard)
  @Get('refresh/:userId')
  refreshTokens(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.authService.refreshTokens(userId);
  }
}
