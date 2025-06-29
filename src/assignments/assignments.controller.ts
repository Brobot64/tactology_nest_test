import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  @Get('my')
  @Roles('student')
  findMyAssignments(@Request() req): Promise<Assignment[]> {
    return this.assignmentsService.findMyAssignments(req.user.id);
  }

  @Get('teaching')
  @Roles('lecturer')
  findTeachingAssignments(@Request() req): Promise<Assignment[]> {
    return this.assignmentsService.findTeachingAssignments(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Assignment> {
    return this.assignmentsService.findOne(id);
  }

  @Post()
  @Roles('lecturer')
  create(@Body() createAssignmentDto: CreateAssignmentDto, @Request() req): Promise<Assignment> {
    return this.assignmentsService.create(createAssignmentDto, req.user.id);
  }

  @Put(':id')
  @Roles('lecturer')
  update(@Param('id') id: string, @Body() updateAssignmentDto: Partial<Assignment>, @Request() req): Promise<Assignment> {
    return this.assignmentsService.update(id, updateAssignmentDto, req.user.id);
  }

  @Delete(':id')
  @Roles('lecturer')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.assignmentsService.remove(id, req.user.id);
  }
}