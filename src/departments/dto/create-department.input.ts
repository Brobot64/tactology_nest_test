import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => CreateSubDepartmentInput)
  subDepartments?: CreateSubDepartmentInput[];
}