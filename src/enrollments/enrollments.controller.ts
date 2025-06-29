import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './entities/enrollment.entity';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';

@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('pending')
  @Roles('lecturer', 'admin')
  findPending(): Promise<Enrollment[]> {
    return this.enrollmentsService.findPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enrollment> {
    return this.enrollmentsService.findOne(id);
  }

  @Post('/courses/:courseId/enroll')
  @Roles('student')
  enrollInCourse(@Param('courseId') courseId: string, @Request() req): Promise<Enrollment> {
    return this.enrollmentsService.enrollInCourse(courseId, req.user.id);
  }

  @Put(':id/status')
  @Roles('lecturer', 'admin')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateEnrollmentStatusDto,
    @Request() req,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateStatus(id, updateStatusDto.status, req.user.id);
  }
}