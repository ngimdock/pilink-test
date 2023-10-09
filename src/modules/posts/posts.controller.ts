import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos';
import { FORUMS, POSTS } from 'src/common/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities';
import { PaginateResponse } from 'src/common/types';
import { PaginateDto } from 'src/common/dtos';

const FORUM_ID = 'forumId';

@Controller()
@ApiTags(POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostEntity,
  })
  @Post(`${FORUMS}/:${FORUM_ID}/${POSTS}`)
  create(
    @Param(FORUM_ID, ParseUUIDPipe) forumId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({ ...createPostDto, forumId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`${FORUMS}/:${FORUM_ID}/${POSTS}`)
  findAll(
    @Param(FORUM_ID, ParseUUIDPipe) forumId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.postsService.findAll(forumId, paginateDto);
  }
}
