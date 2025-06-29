import { IsNotEmpty, IsEnum } from 'class-validator';
import { EnrollmentStatus } from '../entities/enrollment.entity';

export class UpdateEnrollmentStatusDto {
  @IsNotEmpty()
  @IsEnum(['approved', 'rejected', 'completed'])
  status: EnrollmentStatus;
}