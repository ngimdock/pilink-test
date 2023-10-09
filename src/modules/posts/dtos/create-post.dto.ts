import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  readonly forumId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  readonly ownerId: string;

  @ApiProperty({ maxLength: 3 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
