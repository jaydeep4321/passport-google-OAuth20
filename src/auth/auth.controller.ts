import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { log } from 'console';

@Controller('api/auth/google')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    // console.log('rejsdhfjksdf->', req);

    return this.appService.googleLogin(req);
  }
}
