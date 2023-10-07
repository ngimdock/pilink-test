import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from './entities';
import { STUDENTS } from 'src/common/constants';
import { UpdateStudentDto } from './dtos';

@Controller(STUDENTS)
@ApiTags(STUDENTS)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentEntity,
  })
  @Get(':studentId')
  findOneById(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.studentsService.findOneByIdOrThrow(studentId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: StudentEntity,
  })
  @Patch(':studentId')
  update(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(studentId, updateStudentDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':studentId')
  async delete(@Param('studentId', ParseUUIDPipe) studentId: string) {
    await this.studentsService.delete(studentId);
  }
}
