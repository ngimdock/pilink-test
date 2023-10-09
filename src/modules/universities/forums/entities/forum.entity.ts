import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/entities';

export class ForumEntity extends Base {
  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ nullable: true })
  descrition?: string;
}
