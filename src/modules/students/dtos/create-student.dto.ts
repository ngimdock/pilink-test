import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  readonly universityId: string;

  @ApiProperty({ format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
}
