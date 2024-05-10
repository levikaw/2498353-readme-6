import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class CheckGatewayRequestGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return isNotEmpty(context.switchToHttp().getRequest().headers['x-request-id']);
  }
}
