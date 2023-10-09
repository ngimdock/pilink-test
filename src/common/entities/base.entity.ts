import { ApiProperty } from '@nestjs/swagger';

export class Base {
  @ApiProperty()
  id: string;

  @ApiProperty({ format: 'date' })
  createdAt: Date;

  @ApiProperty({ format: 'date' })
  updatedAt: Date;
}
