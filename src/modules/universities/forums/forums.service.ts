import { Injectable } from '@nestjs/common';
import { ForumsRepository } from './forums.repository';
import {
  ForumAlreadyExistsException,
  ForumNotFoundException,
  StudentAlreadyMemberOfThiForumException,
  StudentIsNotMemberOfThisForumException,
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

  async addMember(forumId: string, studentId: string) {
    await this.validateForumMember(forumId, studentId);

    const studentIsMemberOfTheForum = await this.studentIsMemberOfThisForum(
      forumId,
      studentId,
    );

    if (studentIsMemberOfTheForum)
      throw new StudentAlreadyMemberOfThiForumException();

    await this.forumsRepository.addMember(forumId, studentId);
  }

  async removeMember(forumId: string, studentId: string) {
    await this.validateForumMember(forumId, studentId);

    const studentIsMemberOfTheForum = await this.studentIsMemberOfThisForum(
      forumId,
      studentId,
    );

    if (!studentIsMemberOfTheForum)
      throw new StudentIsNotMemberOfThisForumException();

    await this.forumsRepository.removeMember(forumId, studentId);
  }

  private async validateForumMember(forumId: string, studentId: string) {
    await Promise.all([
      this.findOneByIdOrThrow(forumId),
      this.studentsService.findOneByIdOrThrow(studentId),
    ]);
  }

  private studentIsMemberOfThisForum(forumId: string, studentId: string) {
    return this.forumsRepository.findMemberInForum(forumId, studentId);
  }

  findAll(universityId: string, paginateDto: PaginateDto) {
    return this.forumsRepository.findAll(universityId, paginateDto);
  }

  async findOneByIdOrThrow(forumId: string) {
    const forum = await this.findOneById(forumId);

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
