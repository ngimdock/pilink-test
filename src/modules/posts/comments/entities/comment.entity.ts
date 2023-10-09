import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/entities';

export class CommentEntity extends Base {
  @ApiProperty()
  message: string;
}
