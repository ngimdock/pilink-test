import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/entities';

export class PostEntity extends Base {
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty({ type: 'date' })
  createdAt: Date;

  @ApiProperty({ type: 'date' })
  updatedAt: Date;
}
