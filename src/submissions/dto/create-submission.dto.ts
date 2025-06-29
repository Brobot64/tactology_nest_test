import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsString()
  textContent?: string;
}