import { IsNotEmpty, IsString, IsNumber, IsDateString, Min, Max } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number;
}