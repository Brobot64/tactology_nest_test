import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected' | 'completed';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @Column()
  studentId: string;

  @Column({
    type: 'simple-enum',
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  })
  status: EnrollmentStatus;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => User, (user) => user.enrollments)
  student: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}