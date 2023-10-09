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
import { CommentsService } from './comments.service';
import { COMMENTS, POSTS } from 'src/common/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from './entities';
import { CreateCommentDto } from './dtos';
import { PaginateDto } from 'src/common/dtos';
import { PaginateResponse } from 'src/common/types';

@Controller()
@ApiTags(COMMENTS)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentEntity,
  })
  @Post(`${POSTS}/:postId/${COMMENTS}`)
  create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create({ ...createCommentDto, postId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`${POSTS}/:postId/${COMMENTS}`)
  findAll(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.commentsService.findAll(postId, paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: CommentEntity,
  })
  @Get(`${COMMENTS}/:commentId`)
  findOneById(@Param('commentId', ParseUUIDPipe) commentId: string) {
    return this.commentsService.findOneByIdOrThrow(commentId);
  }
}
