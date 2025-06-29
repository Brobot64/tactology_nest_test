import { IsNotEmpty, IsString } from 'class-validator';

export class SyllabusRequestDto {
  @IsNotEmpty()
  @IsString()
  topic: string;
}