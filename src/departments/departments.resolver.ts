import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private departmentsService: DepartmentsService) {}

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(GqlAuthGuard)
  async getDepartments() {
    return this.departmentsService.findAll();
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  async createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentsService.create(createDepartmentInput);
  }
}