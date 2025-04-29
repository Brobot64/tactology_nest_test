import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentsRepository: Repository<SubDepartment>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find({ relations: ['subDepartments'] });
  }

  async create(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const department = this.departmentsRepository.create({
      name: createDepartmentInput.name,
    });

    // @ts-ignore
    if (createDepartmentInput.subDepartments?.length > 0) {
        // @ts-ignore
      department.subDepartments = createDepartmentInput.subDepartments.map(
        (subDept) =>
          this.subDepartmentsRepository.create({
            name: subDept.name,
          }),
      );
    }

    return this.departmentsRepository.save(department);
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({ 
      where: { id },
      relations: ['subDepartments']
    });

    if (!department) {
      throw new Error('Department not found');
    }

    return department;
  }

  async update(
    id: number,
    updateDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const department = await this.departmentsRepository.preload({
      id,
      ...updateDepartmentInput
    });

    if (!department) {
      throw new Error('Department not found');
    }

    if (updateDepartmentInput.subDepartments && updateDepartmentInput.subDepartments.length > 0) {
      department.subDepartments = updateDepartmentInput.subDepartments.map(
        (subDept) =>
          this.subDepartmentsRepository.create({
            name: subDept.name,
          }),
      );
    }

    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.departmentsRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}