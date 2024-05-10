import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_STRATEGY_NAME } from '@project/token-access';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_STRATEGY_NAME) {}
