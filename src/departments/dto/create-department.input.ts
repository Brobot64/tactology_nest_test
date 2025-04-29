import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, ValidateNested, IsArray } from 'class-validator';

@InputType()
class CreateSubDepartmentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @IsArray()
  subDepartments?: CreateSubDepartmentInput[];
}