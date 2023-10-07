import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(9)
  @Transform(({ value }) => value.trim())
  phone: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  fax?: string;
}
