import { Logger, Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { UniversitiesRepository } from './universities.repository';
import { DEFAULT_UNIVERSITIES } from './constants';
import { ForumsModule } from './forums/forums.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [ForumsModule, forwardRef(() => StudentsModule)],
  controllers: [UniversitiesController],
  providers: [UniversitiesService, UniversitiesRepository],
  exports: [UniversitiesService],
})
export class UniversitiesModule implements OnModuleInit {
  private logger = new Logger(UniversitiesModule.name);

  constructor(private readonly universitiesService: UniversitiesService) {}

  async onModuleInit() {
    await this.universitiesService.createMany(DEFAULT_UNIVERSITIES);
    this.logger.debug('Default universities successfully created');
  }
}
