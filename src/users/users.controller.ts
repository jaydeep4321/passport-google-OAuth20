import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  Session,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CurrrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { FindOneParams } from './dtos/findOneParam';
import { ResponseDto } from 'src/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from 'src/auth/guards/google-oauth.guard';
import { GoogleAuthGuard } from 'src/auth/guards/verify.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('api/auth/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/whoami')
  whoAmI(@CurrrentUser() user: User, @Res() res: Response) {
    console.log(user);
    return new ResponseDto().sendSuccess('success', user, res);
  }

  // @Post('/signup')
  // async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
  //   const user = await this.userService.signup(body.email, body.password);
  //   return new ResponseDto().sendSuccess('success', user, res);
  // }

  // @Post('/signin')
  // async signin(
  //   @Body() body: CreateUserDto,
  //   @Res() res: Response,
  //   @Request() req,
  // ) {
  //   // const user = await this.userService.signin(body.email, body.password);
  //   return new ResponseDto().sendSuccess('success', req.user, res);
  // }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async findAllUsers(@Query('email') email: string, @Res() res: Response) {
    console.log('findAllUser called!');
    const user = await this.userService.find(email);
    // console.log(user);

    return new ResponseDto().sendSuccess('success', user, res);
  }

  @Get('/:id')
  async findUser(@Param() id: FindOneParams, @Res() res: Response) {
    console.log('id in controller', id.id);

    const user = await this.userService.findOne(id.id);

    return new ResponseDto().sendSuccess('success', user, res);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userService.update(parseInt(id), body);
  }
}
