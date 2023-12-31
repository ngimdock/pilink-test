import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCommentDto) {
    const { postId, ownerId, ...commentData } = dto;

    return this.prisma.comment.create({
      data: {
        ...commentData,
        post: { connect: { id: postId } },
        owner: { connect: { id: ownerId } },
      },
    });
  }

  async findAll(
    postId: string,
    { offset, limit }: PaginateDto,
  ): Promise<PaginateResponse<Comment>> {
    const [total, comments] = await Promise.all([
      this.prisma.comment.count({ where: { postId } }),

      this.prisma.comment.findMany({
        where: { postId },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      total,
      data: comments,
      isMore: offset + limit < total,
    };
  }

  findOneById(commentId: string) {
    return this.prisma.comment.findUnique({
      where: { id: commentId },
    });
  }

  update(commentId: string, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        ...dto,
      },
    });
  }

  delete(commentId: string) {
    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
