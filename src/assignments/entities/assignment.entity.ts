import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Submission } from '../../submissions/entities/submission.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  weight: number;

  @ManyToOne(() => Course, (course) => course.assignments)
  course: Course;

  @OneToMany(() => Submission, (submission) => submission.assignment)
  submissions: Submission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}