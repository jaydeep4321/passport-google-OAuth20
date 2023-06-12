import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './guards/Serializer';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    SessionSerializer,
    UsersService,
    AuthService,
  ],
  exports: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },]
})
export class AuthModule {}
