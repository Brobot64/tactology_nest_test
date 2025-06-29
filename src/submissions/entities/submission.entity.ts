import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assignmentId: string;

  @Column()
  studentId: string;

  @Column({ nullable: true })
  file: string;

  @Column('text', { nullable: true })
  textContent: string;

  @Column({ nullable: true })
  grade: number;

  @Column('text', { nullable: true })
  feedback: string;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.submissions)
  student: User;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ nullable: true })
  gradedAt: Date;
}