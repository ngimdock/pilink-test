import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import {
  DEFAULT_LIMIT_VALUE,
  DEFAULT_OFFSET_VALUE,
  MAX_LIMIT_VALUE,
  MIN_LIMIT_VALUE,
  MIN_OFFSET_VALUE,
} from '../constants';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty({ example: 0, default: DEFAULT_OFFSET_VALUE })
  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_OFFSET_VALUE)
  @Type(() => Number)
  readonly offset: number = DEFAULT_OFFSET_VALUE;

  @ApiProperty({ example: 10, default: DEFAULT_LIMIT_VALUE })
  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_LIMIT_VALUE)
  @Max(MAX_LIMIT_VALUE)
  @Type(() => Number)
  readonly limit: number = DEFAULT_LIMIT_VALUE;
}
