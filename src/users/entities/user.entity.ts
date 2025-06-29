import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Submission } from '../../submissions/entities/submission.entity';

export type Role = 'student' | 'lecturer' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-enum',
    enum: ['student', 'lecturer', 'admin'],
    default: 'student',
  })
  role: Role;

  @OneToMany(() => Course, (course) => course.lecturer)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Submission, (submission) => submission.student)
  submissions: Submission[];
}