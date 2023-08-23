import Model from './model.entity';
import { AssessmentItem } from './assessmentItem.entity';
import {
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { AssessmentResponse } from './assessmentResponse.entity';

@Entity('assessments')
export class Assessment extends Model {
  @Column()
  title: string;

  @Column()
  type: string;

  @OneToMany(() => AssessmentItem, (assessment) => assessment.assessment, {
    cascade: true,
  })
  @JoinTable()
  assessmentItems: AssessmentItem[];

  @OneToMany(() => AssessmentResponse, (assessmentResponse) => assessmentResponse.assessment,  {
    nullable: true
  })
  responses: AssessmentResponse[];
}
