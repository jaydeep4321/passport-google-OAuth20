import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      secret: 'this-is-secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 3600000,
        // sameSite: 'none',
        httpOnly: false,
        secure: false,
      },
    }),
  );
  app.set('trust proxy', 1);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    allowedHeaders: [
      'origin',
      'x-requested-with',
      'content-type',
      'accept',
      'authorization',
      'x-access-token',
      'access-token',
      'cookie',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
