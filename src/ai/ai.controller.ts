import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AiService } from './ai.service';
import { RecommendationRequestDto } from './dto/recommendation-request.dto';
import { SyllabusRequestDto } from './dto/syllabus-request.dto';
import { AIRecommendation } from './interfaces/ai-recommendation.interface';
import { AISyllabus } from './interfaces/ai-syllabus.interface';

@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  @Roles('student')
  getRecommendations(@Body() recommendationRequestDto: RecommendationRequestDto): Promise<AIRecommendation> {
    return this.aiService.getRecommendations(recommendationRequestDto.interests);
  }

  @Post('syllabus')
  @Roles('lecturer')
  generateSyllabus(@Body() syllabusRequestDto: SyllabusRequestDto): Promise<AISyllabus> {
    return this.aiService.generateSyllabus(syllabusRequestDto.topic);
  }
}