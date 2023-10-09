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
import { CommentsService } from './comments.service';
import { COMMENTS, POSTS } from 'src/common/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from './entities';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
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

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Patch(`${COMMENTS}/:commentId`)
  async update(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentsService.update(commentId, updateCommentDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(`${COMMENTS}/:commentId`)
  async delete(@Param('commentId', ParseUUIDPipe) commentId: string) {
    await this.commentsService.delete(commentId);
  }
}
