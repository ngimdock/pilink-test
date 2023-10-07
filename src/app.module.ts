import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentsModule } from './modules/students/students.module';
import { PostsModule } from './modules/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    StudentsModule,
    PostsModule,
    PrismaModule,
    UniversitiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
