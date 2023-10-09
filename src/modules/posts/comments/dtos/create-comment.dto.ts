import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
