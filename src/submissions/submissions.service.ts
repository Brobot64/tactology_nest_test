import { Injectable, NotFoundException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { GradeSubmissionDto } from './dto/grade-submission.dto';
import { AssignmentsService } from '../assignments/assignments.service';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    private assignmentsService: AssignmentsService,
  ) {}

  async findAll(): Promise<Submission[]> {
    return this.submissionsRepository.find({
      relations: ['assignment', 'student'],
    });
  }

  async findOne(id: string): Promise<Submission> {
    const submission = await this.submissionsRepository.findOne({
      where: { id },
      relations: ['assignment', 'student'],
    });
    
    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }
    
    return submission;
  }

  async findByAssignment(assignmentId: string): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: { assignmentId },
      relations: ['student'],
    });
  }

  async findByStudent(studentId: string): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: { studentId },
      relations: ['assignment'],
    });
  }

  async create(createSubmissionDto: CreateSubmissionDto, studentId: string): Promise<Submission> {
    // Verify the assignment exists
    const assignment = await this.assignmentsService.findOne(createSubmissionDto.assignmentId);
    
    // Check if student already submitted
    const existingSubmission = await this.submissionsRepository.findOne({
      where: {
        assignmentId: createSubmissionDto.assignmentId,
        studentId,
      },
    });
    
    if (existingSubmission) {
      throw new ConflictException('You have already submitted this assignment');
    }
    
    // Check if at least one of file or textContent is provided
    if (!createSubmissionDto.file && !createSubmissionDto.textContent) {
      throw new BadRequestException('Either file or textContent must be provided');
    }
    
    const submission = this.submissionsRepository.create({
      ...createSubmissionDto,
      studentId,
    });
    
    return this.submissionsRepository.save(submission);
  }

  async gradeSubmission(id: string, gradeSubmissionDto: GradeSubmissionDto, lecturerId: string): Promise<Submission> {
    const submission = await this.findOne(id);
    
    // Verify lecturer is teaching the course
    const assignment = await this.assignmentsService.findOne(submission.assignmentId);
    const course = await this.assignmentsService['coursesService'].findOne(assignment.courseId);
    
    if (course.lecturerId !== lecturerId) {
      throw new ForbiddenException('You can only grade submissions for courses you teach');
    }
    
    submission.grade = gradeSubmissionDto.grade;
    submission.feedback = gradeSubmissionDto.feedback;
    submission.gradedAt = new Date();
    
    return this.submissionsRepository.save(submission);
  }
}