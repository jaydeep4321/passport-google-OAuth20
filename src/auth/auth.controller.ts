import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { log } from 'console';
import { GoogleAuthGuard } from './guards/verify.guard';
import { ok } from 'assert';

@Controller('api/auth/google')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    // console.log('rejsdhfjksdf->', req);

    return { msg: ok };

    // return this.appService.googleLogin(req);
  }

  // @Get('status')
  // user(@Req() request: Request) {
  //   console.log(request.user);
  //   if (request.user) {
  //     return { msg: 'Authenticated' };
  //   } else {
  //     return { msg: 'Not Authenticated' };
  //   }
  // }
}
