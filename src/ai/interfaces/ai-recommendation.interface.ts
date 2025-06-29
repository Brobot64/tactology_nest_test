import { Course } from '../../courses/entities/course.entity';

export interface AIRecommendation {
  courses: Course[];
  reason: string;
}