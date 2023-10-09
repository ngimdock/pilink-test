import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { PostsService } from '../posts.service';
import { StudentsService } from 'src/modules/students/students.service';
import { ForumsService } from 'src/modules/universities/forums/forums.service';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';
import { Comment } from '@prisma/client';
import { CommentNotFoundException } from './exceptions';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsService: PostsService,
    private readonly studentsService: StudentsService,
    private readonly forumsService: ForumsService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    await this.validateComment(createCommentDto);

    return this.commentsRepository.create(createCommentDto);
  }

  private async validateComment({ postId, ownerId }: CreateCommentDto) {
    const [{ forumId }] = await Promise.all([
      this.postsService.findOneByIdOrThrow(postId),
      this.studentsService.findOneByIdOrThrow(ownerId),
    ]);

    const memberId = ownerId;

    await this.forumsService.checkStudentIsMemberOfTheForum(forumId, memberId);
  }

  findAll(
    postId: string,
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<Comment>> {
    return this.commentsRepository.findAll(postId, paginateDto);
  }

  findOneById(commentId: string) {
    return this.commentsRepository.findOneById(commentId);
  }

  async findOneByIdOrThrow(commentId: string) {
    const comment = await this.findOneById(commentId);

    if (!comment) throw new CommentNotFoundException();

    return comment;
  }

  async update(commentId: string, updateCommentDto: UpdateCommentDto) {
    await this.findOneByIdOrThrow(commentId);

    return this.commentsRepository.update(commentId, updateCommentDto);
  }

  async delete(commentId: string) {
    await this.findOneByIdOrThrow(commentId);

    return this.commentsRepository.delete(commentId);
  }
}
