import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUniversityDto } from './dtos';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { University } from '@prisma/client';

@Injectable()
export class UniversitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUniversityDto) {
    return this.prisma.university.create({
      data: { ...dto },
    });
  }

  async findAll({
    offset,
    limit,
  }: PaginateDto): Promise<PaginateResponse<University>> {
    const [total, universities] = await Promise.all([
      this.prisma.university.count(),
      this.prisma.university.findMany({
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      total,
      data: universities,
      isMore: offset + limit < total,
    };
  }

  findOneByName(name: string) {
    return this.prisma.university.findUnique({
      where: { name },
    });
  }

  findOneById(universityId: string) {
    return this.prisma.university.findUnique({
      where: { id: universityId },
    });
  }
}
