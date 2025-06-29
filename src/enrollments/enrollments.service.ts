import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment, EnrollmentStatus } from './entities/enrollment.entity';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    private coursesService: CoursesService,
  ) {}

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find({
      relations: ['course', 'student'],
    });
  }

  async findPending(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find({
      where: { status: 'pending' },
      relations: ['course', 'student'],
    });
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id },
      relations: ['course', 'student'],
    });
    
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    
    return enrollment;
  }

  async enrollInCourse(courseId: string, studentId: string): Promise<Enrollment> {
    // Check if course exists
    await this.coursesService.findOne(courseId);
    
    // Check if already enrolled
    const existingEnrollment = await this.enrollmentsRepository.findOne({
      where: { courseId, studentId },
    });
    
    if (existingEnrollment) {
      throw new ConflictException('Already enrolled in this course');
    }
    
    const enrollment = this.enrollmentsRepository.create({
      courseId,
      studentId,
      status: 'pending',
    });
    
    return this.enrollmentsRepository.save(enrollment);
  }

  async updateStatus(id: string, status: EnrollmentStatus, userId: string): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    
    // Check if the user is the lecturer of the course
    const course = await this.coursesService.findOne(enrollment.courseId);
    
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('Only the course lecturer can update enrollment status');
    }
    
    enrollment.status = status;
    return this.enrollmentsRepository.save(enrollment);
  }
}