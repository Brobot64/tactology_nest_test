import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
// Add this import
import { EnrollmentsService } from '../enrollments/enrollments.service';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  // Update the constructor in CoursesController
  constructor(
    private readonly coursesService: CoursesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get('available')
  @Roles('student')
  findAvailable(@Request() req): Promise<Course[]> {
    return this.coursesService.findAvailable(req.user.id);
  }

  @Get('teaching')
  @Roles('lecturer')
  findTeaching(@Request() req): Promise<Course[]> {
    return this.coursesService.findTeaching(req.user.id);
  }

  @Get('enrolled')
  @Roles('student')
  findEnrolled(@Request() req): Promise<Course[]> {
    return this.coursesService.findEnrolled(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Post()
  @Roles('lecturer', 'admin')
  create(@Body() createCourseDto: CreateCourseDto, @Request() req): Promise<Course> {
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Put(':id')
  @Roles('lecturer', 'admin')
  update(@Param('id') id: string, @Body() updateCourseDto: Partial<Course>, @Request() req): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto, req.user.id);
  }

  @Delete(':id')
  @Roles('lecturer', 'admin')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.coursesService.remove(id, req.user.id);
  }

  // Add this method to the CoursesController class
  
  @Post(':id/enroll')
  @Roles('student')
  enrollInCourse(@Param('id') id: string, @Request() req): Promise<any> {
    // This is just a redirect to the enrollments service
    return this.enrollmentsService.enrollInCourse(id, req.user.id);
  }
}