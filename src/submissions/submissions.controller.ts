import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { GradeSubmissionDto } from './dto/grade-submission.dto';
import { Submission } from './entities/submission.entity';

@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  @Roles('lecturer', 'admin')
  findAll(): Promise<Submission[]> {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<Submission> {
    // Additional authorization check could be added here
    return this.submissionsService.findOne(id);
  }

  @Post('assignments/:assignmentId/submit')
  @Roles('student')
  submit(
    @Param('assignmentId') assignmentId: string,
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Request() req,
  ): Promise<Submission> {
    // Ensure the assignmentId in the URL matches the one in the DTO
    createSubmissionDto.assignmentId = assignmentId;
    return this.submissionsService.create(createSubmissionDto, req.user.id);
  }

  @Put(':id/grade')
  @Roles('lecturer')
  grade(
    @Param('id') id: string,
    @Body() gradeSubmissionDto: GradeSubmissionDto,
    @Request() req,
  ): Promise<Submission> {
    return this.submissionsService.gradeSubmission(id, gradeSubmissionDto, req.user.id);
  }
}