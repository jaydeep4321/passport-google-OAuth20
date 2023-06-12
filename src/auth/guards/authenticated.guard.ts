import { CanActivate, ExecutionContext } from '@nestjs/common';
import { log } from 'console';

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('authsjkdhfjsfsdf->', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
