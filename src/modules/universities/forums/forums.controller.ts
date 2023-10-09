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
import { ForumsService } from './forums.service';
import { CreateForumDto } from './dtos';
import { FORUMS } from 'src/common/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UNIVERSITIES } from '../constants';
import { ForumEntity } from './entities';
import { PaginateResponse } from 'src/common/types';
import { PaginateDto } from 'src/common/dtos';

@Controller()
@ApiTags(FORUMS)
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ForumEntity,
  })
  @Post(`${UNIVERSITIES}/:universityId/${FORUMS}`)
  create(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Body() createForumDto: CreateForumDto,
  ) {
    return this.forumsService.create({ ...createForumDto, universityId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`${UNIVERSITIES}/:universityId/${FORUMS}`)
  findAll(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.forumsService.findAll(universityId, paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ForumEntity,
  })
  @Get(`${FORUMS}/:forumId`)
  findOneById(@Param('forumId', ParseUUIDPipe) forumId: string) {
    return this.forumsService.findOneByIdOrThrow(forumId);
  }
}
