import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUserFromToken, JwtAuthGuard, RefreshTokenGuard } from '@project/common';
import { TokensDto, TokenUserDto } from '@project/dtos/tokens-dto';
import { TokenService } from '@project/token-access';
import { LoginUserDto } from '@project/dtos/user-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

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
  @Post('login')
  public async login(@Body() account: LoginUserDto): Promise<TokensDto> {
    try {
      const { passwordHash, ...user } = await this.authService.authUser(account);
      const refreshTokenId = crypto.randomUUID();

      await this.tokenService.setToken(user.id, refreshTokenId);

      return await this.tokenService.getTokens({
        userId: user.id,
        refreshTokenId: refreshTokenId,
        email: user.email,
        userName: user.userName,
        role: user.role,
        avatar: user.avatar,
      });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot auth user', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('check-access')
  @ApiOkResponse({
    description: 'Check access token',
    type: TokenUserDto,
    isArray: false,
  })
  public async checkAccess(@CurrentUserFromToken() user: TokenUserDto): Promise<TokenUserDto> {
    return user;
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Get('check-refresh')
  @ApiOkResponse({
    description: 'Check refresh token',
    type: TokenUserDto,
    isArray: false,
  })
  public async checkRefresh(@CurrentUserFromToken() user: TokenUserDto): Promise<TokenUserDto> {
    return user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOkResponse({
    description: 'Get new tokens',
    type: TokensDto,
    isArray: false,
  })
  @ApiBearerAuth()
  public async refreshTokens(@CurrentUserFromToken() user: TokenUserDto): Promise<TokensDto> {
    try {
      const refreshTokenId = crypto.randomUUID();
      await this.tokenService.setToken(user.userId, refreshTokenId);

      return await this.tokenService.getTokens({ ...user, refreshTokenId: refreshTokenId });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Cannot auth user', HttpStatus.UNAUTHORIZED);
    }
  }
}
