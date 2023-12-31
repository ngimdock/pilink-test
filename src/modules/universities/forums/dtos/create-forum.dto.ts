import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateForumDto {
  readonly universityId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly cratorId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsOptional()
  readonly descrition?: string;
}
