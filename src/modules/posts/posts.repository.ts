import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { Post } from '@prisma/client';
import { PaginateResponse } from 'src/common/types';
import { PaginateDto } from 'src/common/dtos';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostDto) {
    const { ownerId, forumId, ...postData } = dto;

    return this.prisma.post.create({
      data: {
        ...postData,
        forum: { connect: { id: forumId } },
        owner: { connect: { id: ownerId } },
      },
    });
  }

  async findAll(
    forumId: string,
    { offset, limit }: PaginateDto,
  ): Promise<PaginateResponse<Post>> {
    const [total, posts] = await Promise.all([
      this.prisma.post.count({ where: { forumId } }),

      this.prisma.post.findMany({
        where: { forumId },
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      total,
      data: posts,
      isMore: offset + limit < total,
    };
  }

  findOneById(postId: string) {
    return this.prisma.post.findUnique({
      where: { id: postId },
      include: { comments: { select: { id: true, message: true } } },
    });
  }

  update(postId: string, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: postId },
      data: { ...dto },
    });
  }

  delete(postId: string) {
    return this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
