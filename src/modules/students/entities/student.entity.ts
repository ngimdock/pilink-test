import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/entities';

export class StudentEntity extends Base {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
}
