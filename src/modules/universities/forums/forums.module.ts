import { Module, forwardRef } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { UniversitiesModule } from '../universities.module';
import { ForumsRepository } from './forums.repository';
import { StudentsModule } from 'src/modules/students/students.module';
import { ForumsController } from './forums.controller';

@Module({
  imports: [
    forwardRef(() => UniversitiesModule),
    forwardRef(() => StudentsModule),
  ],
  controllers: [ForumsController],
  providers: [ForumsService, ForumsRepository],
  exports: [ForumsService],
})
export class ForumsModule {}
