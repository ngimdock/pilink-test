import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { Forum } from '@prisma/client';
import { CreateForumDto } from './dtos';

@Injectable()
export class ForumsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateForumDto) {
    const { cratorId, universityId, ...forumData } = dto;
    return this.prisma.forum.create({
      data: {
        ...forumData,
        crator: { connect: { id: cratorId } },
        university: { connect: { id: universityId } },
      },
    });
  }

  async addMember(forumId: string, studentId: string) {
    await this.prisma.studentOnForum.create({
      data: {
        forumId,
        studentId,
      },
    });
  }

  async removeMember(forumId: string, studentId: string) {
    await this.prisma.studentOnForum.delete({
      where: {
        forumId_studentId: {
          forumId,
          studentId,
        },
      },
    });
  }

  findMemberInForum(forumId: string, studentId: string) {
    return this.prisma.studentOnForum.findUnique({
      where: {
        forumId_studentId: { forumId, studentId },
      },
    });
  }

  async findAll(
    universityId: string,
    { offset, limit }: PaginateDto,
  ): Promise<PaginateResponse<Forum>> {
    const [total, forums] = await Promise.all([
      this.prisma.forum.count({ where: { universityId } }),

      this.prisma.forum.findMany({
        where: { universityId },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      total,
      data: forums,
      isMore: offset + limit < total,
    };
  }

  findOneById(forumId: string) {
    return this.prisma.forum.findUnique({
      where: { id: forumId },
      include: {
        crator: true,
        members: {
          select: {
            memberAt: true,
            student: {
              select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
    });
  }

  findOneByName(name: string) {
    return this.prisma.forum.findUnique({
      where: { name },
    });
  }
}
