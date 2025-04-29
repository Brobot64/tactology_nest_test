import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  async createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentInput);
  }
}