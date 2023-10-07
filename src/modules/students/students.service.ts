import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { Student } from '@prisma/client';
import { CreateStudentDto, UpdateStudentDto } from './dtos';
import { UniversitiesService } from '../universities/universities.service';
import {
  StudentAlreadyExistsException,
  StudentNotFoundException,
} from './exceptions';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly universitiesService: UniversitiesService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { universityId, email } = createStudentDto;

    await this.universitiesService.findOneByIdOrThrow(universityId);

    const studentExists = await this.findOneByEmail(email);

    if (studentExists) throw new StudentAlreadyExistsException();

    return this.studentsRepository.create(createStudentDto);
  }

  async findAll(
    universityId: string,
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<Student>> {
    return this.studentsRepository.findAll(universityId, paginateDto);
  }

  async update(studentId: string, dto: UpdateStudentDto) {
    const student = await this.findOneById(studentId);

    if (!student) throw new StudentNotFoundException();

    return this.studentsRepository.update(studentId, dto);
  }

  async findOneByIdOrThrow(studentId: string) {
    const student = await this.findOneById(studentId);

    if (!student) throw new StudentNotFoundException();

    return student;
  }

  findOneByEmail(email: string) {
    return this.studentsRepository.findOneByEmail(email);
  }

  findOneById(studentId: string) {
    return this.studentsRepository.findOneById(studentId);
  }
}
