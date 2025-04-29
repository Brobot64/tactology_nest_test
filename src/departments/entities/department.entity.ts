import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
export class Department {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [SubDepartment])
  subDepartments: SubDepartment[];
}