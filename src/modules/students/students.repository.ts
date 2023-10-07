import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dtos';

@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateStudentDto) {
    const { universityId, ...studentData } = dto;

    return this.prisma.student.create({
      data: {
        ...studentData,
        university: { connect: { id: universityId } },
      },
    });
  }

  async findAll(
    universityId: string,
    { offset, limit }: PaginateDto,
  ): Promise<PaginateResponse<Student>> {
    const [total, students] = await Promise.all([
      this.prisma.student.count(),
      this.prisma.student.findMany({
        where: { universityId },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      total,
      data: students,
      isMore: offset + limit < total,
    };
  }

  update(studentId: string, dto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: { ...dto },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.student.findUnique({
      where: { email },
    });
  }

  findOneById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  delete(studentId: string) {
    return this.prisma.student.delete({
      where: { id: studentId },
    });
  }
}
