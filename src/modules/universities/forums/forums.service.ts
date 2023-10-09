import { Injectable } from '@nestjs/common';
import { ForumsRepository } from './forums.repository';
import {
  ForumAlreadyExistsException,
  ForumNotFoundException,
} from './exceptions';
import { CreateForumDto } from './dtos';
import { StudentsService } from 'src/modules/students/students.service';
import { UniversitiesService } from '../universities.service';
import { PaginateDto } from 'src/common/dtos';

@Injectable()
export class ForumsService {
  constructor(
    private readonly forumsRepository: ForumsRepository,
    private readonly studentsService: StudentsService,
    private readonly universitiesService: UniversitiesService,
  ) {}

  async create(createForumDto: CreateForumDto) {
    await this.validateForum(createForumDto);

    // console.log({ createForumDto });

    return this.forumsRepository.create(createForumDto);
  }

  private async validateForum({
    universityId,
    cratorId,
    name,
  }: CreateForumDto) {
    await Promise.all([
      this.universitiesService.findOneByIdOrThrow(universityId),
      this.studentsService.findOneByIdOrThrow(cratorId),
    ]);

    const forumExists = await this.findOneByName(name);

    if (forumExists) throw new ForumAlreadyExistsException();
  }

  findAll(universityId: string, paginateDto: PaginateDto) {
    return this.forumsRepository.findAll(universityId, paginateDto);
  }

  async findOneByIdOrThrow(forumId: string) {
    const forum = this.findOneById(forumId);

    if (!forum) throw new ForumNotFoundException();

    return forum;
  }

  findOneByNameOrThrow(name: string) {
    const forum = this.findOneByName(name);

    if (!forum) throw new ForumNotFoundException();

    return forum;
  }

  findOneById(forumId: string) {
    return this.forumsRepository.findOneById(forumId);
  }

  findOneByName(name: string) {
    return this.forumsRepository.findOneByName(name);
  }
}
