import { Body, Controller, HttpException, HttpStatus, Logger, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

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
  public async login(@Body(new ValidationPipe()) dto: LoginUserDto): Promise<{ token: string }> {
    try {
      return await this.authService.authUser(dto);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
