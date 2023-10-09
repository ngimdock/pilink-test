import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  readonly postId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly ownerId: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
