import { Injectable } from '@nestjs/common';
import { UniversitiesRepository } from './universities.repository';
import { CreateUniversityDto } from './dtos';
import { University } from '@prisma/client';
import { UniversityNotFoundException } from './exceptions';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';

@Injectable()
export class UniversitiesService {
  constructor(
    private readonly universitiesRepository: UniversitiesRepository,
  ) {}

  private async createIfNotExists(dto: CreateUniversityDto) {
    const universityExists = await this.findOneByName(dto.name);

    if (!universityExists) await this.universitiesRepository.create(dto);
  }

  async createMany(universities: CreateUniversityDto[]) {
    for (const university of universities) {
      await this.createIfNotExists(university);
    }
  }

  async findAll(
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<University>> {
    return this.universitiesRepository.findAll(paginateDto);
  }

  findOneByName(name: string): Promise<null | University> {
    return this.universitiesRepository.findOneByName(name);
  }

  findOneById(unversityId: string): Promise<null | University> {
    return this.universitiesRepository.findOneById(unversityId);
  }

  async findOneByIdOrThrow(unversityId: string): Promise<null | University> {
    const university = await this.findOneById(unversityId);

    if (!university) throw new UniversityNotFoundException();

    return this.universitiesRepository.findOneById(unversityId);
  }
}
