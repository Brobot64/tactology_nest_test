import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

// Add this import
import { EnrollmentsModule } from '../enrollments/enrollments.module';

// Update the imports array
imports: [
  TypeOrmModule.forFeature([Course]),
  EnrollmentsModule,
],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}