import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from './entities';
import { STUDENTS } from 'src/common/constants';

@Controller(STUDENTS)
@ApiTags(STUDENTS)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: StudentEntity,
  })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentEntity,
  })
  @Get('studentId')
  findOneById(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.studentsService.findOneByIdOrThrow(studentId);
  }
}
