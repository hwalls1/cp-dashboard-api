import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Assessment } from './assessment.entity';
import { AssessmentItemResponse } from './assessmentItemResponse.entity';

@Entity('assessmentItems')
export class AssessmentItem extends Model {
  @Column({
    nullable: true
  })
  title: string;

  @Column({
    nullable: true
  })
  type: string;

  @Column({
    nullable: true
  })
  link: string;

  @Column({
    nullable: true
  })
  notes: string;

  @ManyToOne(() => Assessment, (assessment) => assessment.assessmentItems)
  assessment: Assessment;

  @ManyToOne(
    () => AssessmentItemResponse,
    (assessmentItemResponse) => assessmentItemResponse.assessmentItem,
    {
      nullable: true,
    }
  )
  assessmentItemResponses: AssessmentItemResponse[];
}
