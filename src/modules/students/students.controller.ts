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
import { StudentsService } from './students.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from './entities';
import { STUDENTS, UNIVERSITIES } from 'src/common/constants';
import { CreateStudentDto, UpdateStudentDto } from './dtos';
import { PaginateResponse } from 'src/common/types';
import { PaginateDto } from 'src/common/dtos';

@Controller()
@ApiTags(STUDENTS)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: StudentEntity,
  })
  @Post(`${UNIVERSITIES}/:universityId/${STUDENTS}`)
  createStudent(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create({ ...createStudentDto, universityId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginateResponse,
  })
  @Get(`${UNIVERSITIES}/:universityId/${STUDENTS}`)
  findAllStudents(
    @Param('universityId', ParseUUIDPipe) universityId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.studentsService.findAll(universityId, paginateDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentEntity,
  })
  @Get(`${STUDENTS}/:studentId`)
  findOneById(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.studentsService.findOneByIdOrThrow(studentId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentEntity,
  })
  @Patch(`${STUDENTS}/:studentId`)
  update(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(studentId, updateStudentDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(`${STUDENTS}/:studentId`)
  async delete(@Param('studentId', ParseUUIDPipe) studentId: string) {
    await this.studentsService.delete(studentId);
  }
}
