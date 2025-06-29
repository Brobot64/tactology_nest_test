import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findAvailable(studentId: string): Promise<Course[]> {
    // Get all courses that the student is not enrolled in
    const query = `
      SELECT c.*
      FROM course c
      WHERE NOT EXISTS (
        SELECT 1 FROM enrollment e
        WHERE e.courseId = c.id AND e.studentId = :studentId
      )
    `;
    
    return this.coursesRepository.query(query, { studentId });
  }

  async findTeaching(lecturerId: string): Promise<Course[]> {
    return this.coursesRepository.find({
      where: { lecturerId },
    });
  }

  async findEnrolled(studentId: string): Promise<Course[]> {
    const query = `
      SELECT c.*
      FROM course c
      JOIN enrollment e ON e.courseId = c.id
      WHERE e.studentId = :studentId AND e.status = 'approved'
    `;
    
    return this.coursesRepository.query(query, { studentId });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto, user: User): Promise<Course> {
    if (user.role !== 'lecturer' && user.role !== 'admin') {
      throw new ForbiddenException('Only lecturers and admins can create courses');
    }
    
    const course = this.coursesRepository.create({
      ...createCourseDto,
      lecturerId: user.id,
    });
    
    return this.coursesRepository.save(course);
  }

  async update(id: string, updateCourseDto: Partial<Course>, userId: string): Promise<Course> {
    const course = await this.findOne(id);
    
    // Check if the user is the lecturer of the course or an admin
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('You can only update your own courses');
    }
    
    Object.assign(course, updateCourseDto);
    return this.coursesRepository.save(course);
  }

  async remove(id: string, userId: string): Promise<void> {
    const course = await this.findOne(id);
    
    // Check if the user is the lecturer of the course or an admin
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('You can only delete your own courses');
    }
    
    await this.coursesRepository.remove(course);
  }
}