import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponse<T extends object> {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty()
  isMore: boolean;

  @ApiProperty({ isArray: true })
  data: T[];
}
