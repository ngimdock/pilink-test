import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { ForumsService } from '../universities/forums/forums.service';
import { StudentsService } from '../students/students.service';
import { PaginateDto } from 'src/common/dtos';
import { PostNotFoundException } from './exceptions';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly forumsService: ForumsService,
    private readonly studentsService: StudentsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    await this.validatePost(createPostDto);

    return this.postsRepository.create(createPostDto);
  }

  private async validatePost({ forumId, ownerId }: CreatePostDto) {
    await Promise.all([
      this.forumsService.findOneByIdOrThrow(forumId),
      this.studentsService.findOneByIdOrThrow(ownerId),
    ]);

    const memberId = ownerId;

    await this.forumsService.checkStudentIsMemberOfTheForum(forumId, memberId);
  }

  findAll(forumId: string, paginateDto: PaginateDto) {
    return this.postsRepository.findAll(forumId, paginateDto);
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
    await this.findOneByIdOrThrow(postId);

    return this.postsRepository.update(postId, updatePostDto);
  }

  async delete(postId: string) {
    await this.findOneByIdOrThrow(postId);

    await this.postsRepository.delete(postId);
  }

  async findOneByIdOrThrow(postId: string) {
    const post = await this.findOneById(postId);

    if (!post) throw new PostNotFoundException();

    return post;
  }

  findOneById(postId: string) {
    return this.postsRepository.findOneById(postId);
  }
}
