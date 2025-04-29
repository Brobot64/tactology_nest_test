import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Department } from './department.entity';

@ObjectType()
export class SubDepartment {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Department)
  department: Department;
}