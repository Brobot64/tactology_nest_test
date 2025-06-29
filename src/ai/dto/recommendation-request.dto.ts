import { IsNotEmpty, IsString } from 'class-validator';

export class RecommendationRequestDto {
  @IsNotEmpty()
  @IsString()
  interests: string;
}