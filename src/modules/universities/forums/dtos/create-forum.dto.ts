import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateForumDto {
  @IsUUID()
  @IsNotEmpty()
  readonly cratorId: string;

  readonly universityId: string;

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
