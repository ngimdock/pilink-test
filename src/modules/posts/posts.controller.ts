import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { FORUMS, POSTS } from 'src/common/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities';
import { PaginateResponse } from 'src/common/types';
import { PaginateDto } from 'src/common/dtos';

@Controller()
@ApiTags(POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostEntity,
  })
  @Post(`${FORUMS}/:forumId/${POSTS}`)
  create(
    @Param('forumId', ParseUUIDPipe) forumId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({ ...createPostDto, forumId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`${FORUMS}/:forumId/${POSTS}`)
  findAll(
    @Param('forumId', ParseUUIDPipe) forumId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.postsService.findAll(forumId, paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PostEntity,
  })
  @Get(`${POSTS}/:postId`)
  findOneById(@Param('postId', ParseUUIDPipe) postId: string) {
    return this.postsService.findOneByIdOrThrow(postId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PostEntity,
  })
  @Patch(`${POSTS}/:postId`)
  update(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, updatePostDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(`${POSTS}/:postId`)
  async delete(@Param('postId', ParseUUIDPipe) postId: string) {
    await this.postsService.delete(postId);
  }
}
