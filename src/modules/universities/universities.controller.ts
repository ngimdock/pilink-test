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
import { UniversitiesService } from './universities.service';
import { PaginateDto } from 'src/common/dtos';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateResponse } from 'src/common/types';
import { UNIVERSITIES } from './constants';
import { STUDENTS } from 'src/common/constants';
import { StudentEntity } from '../students/entities';
import { StudentsService } from '../students/students.service';
import { CreateStudentDto } from '../students/dtos';

@Controller(UNIVERSITIES)
@ApiTags(UNIVERSITIES)
export class UniversitiesController {
  constructor(
    private readonly universitiesService: UniversitiesService,
    private readonly studentsService: StudentsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get()
  findAll(@Query() paginateDto: PaginateDto) {
    return this.universitiesService.findAll(paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`:universityId/${STUDENTS}`)
  findAllStudents(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.studentsService.findAll(universityId, paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: StudentEntity,
  })
  @Post(`:universityId/${STUDENTS}`)
  createStudent(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create({ ...createStudentDto, universityId });
  }
}
