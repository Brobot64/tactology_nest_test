import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
    private coursesService: CoursesService,
  ) {}

  async findAll(): Promise<Assignment[]> {
    return this.assignmentsRepository.find();
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assignmentsRepository.findOne({ where: { id } });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  async findByCourse(courseId: string): Promise<Assignment[]> {
    return this.assignmentsRepository.find({
      where: { courseId },
      order: { dueDate: 'ASC' },
    });
  }

  async findMyAssignments(studentId: string): Promise<Assignment[]> {
    // Get enrolled courses for student
    const query = `
      SELECT a.*
      FROM assignment a
      JOIN course c ON a.courseId = c.id
      JOIN enrollment e ON e.courseId = c.id
      WHERE e.studentId = :studentId AND e.status = 'approved'
      ORDER BY a.dueDate ASC
    `;
    
    return this.assignmentsRepository.query(query, { studentId });
  }

  async findTeachingAssignments(lecturerId: string): Promise<Assignment[]> {
    const query = `
      SELECT a.*
      FROM assignment a
      JOIN course c ON a.courseId = c.id
      WHERE c.lecturerId = :lecturerId
      ORDER BY a.dueDate ASC
    `;
    
    return this.assignmentsRepository.query(query, { lecturerId });
  }

  async create(createAssignmentDto: CreateAssignmentDto, userId: string): Promise<Assignment> {
    // Verify the course exists and user is the lecturer
    const course = await this.coursesService.findOne(createAssignmentDto.courseId);
    
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('You can only create assignments for courses you teach');
    }
    
    const assignment = this.assignmentsRepository.create(createAssignmentDto);
    return this.assignmentsRepository.save(assignment);
  }

  async update(id: string, updateAssignmentDto: Partial<Assignment>, userId: string): Promise<Assignment> {
    const assignment = await this.findOne(id);
    
    // Verify user is the lecturer of the course
    const course = await this.coursesService.findOne(assignment.courseId);
    
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('You can only update assignments for courses you teach');
    }
    
    Object.assign(assignment, updateAssignmentDto);
    return this.assignmentsRepository.save(assignment);
  }

  async remove(id: string, userId: string): Promise<void> {
    const assignment = await this.findOne(id);
    
    // Verify user is the lecturer of the course
    const course = await this.coursesService.findOne(assignment.courseId);
    
    if (course.lecturerId !== userId) {
      throw new ForbiddenException('You can only delete assignments for courses you teach');
    }
    
    await this.assignmentsRepository.remove(assignment);
  }
}