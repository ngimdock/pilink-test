import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { PaginateDto } from 'src/common/dtos';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateResponse } from 'src/common/types';
import { UNIVERSITIES } from './constants';

@Controller(UNIVERSITIES)
@ApiTags(UNIVERSITIES)
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get()
  findAll(@Query() paginateDto: PaginateDto) {
    return this.universitiesService.findAll(paginateDto);
  }
}
