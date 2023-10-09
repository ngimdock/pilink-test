import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { ForumsModule } from '../universities/forums/forums.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [ForumsModule, StudentsModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
})
export class PostsModule {}
