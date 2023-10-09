import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { ForumsModule } from '../universities/forums/forums.module';
import { StudentsModule } from '../students/students.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ForumsModule, StudentsModule, forwardRef(() => CommentsModule)],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService, StudentsModule, ForumsModule],
})
export class PostsModule {}
