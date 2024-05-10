import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { TokenUserDto } from '@project/dtos/tokens-dto';
import { AUTH_EXCEPTION } from '@project/constants/exception-messages';
import { fillDto } from '../utils/fill-dto';

export const CurrentUserFromToken = createParamDecorator((_, ctx: ExecutionContext): TokenUserDto => {
  try {
    const user = ctx.switchToHttp().getRequest().user;

    return fillDto(TokenUserDto, user);
  } catch (error) {
    Logger.error('Error in CurrentUserFromToken decorator:', error.message);
    throw new Error(AUTH_EXCEPTION.NOT_FOUND);
  }
});
