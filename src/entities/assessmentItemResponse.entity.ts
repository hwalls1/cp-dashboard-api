import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { AssessmentItem } from './assessmentItem.entity';
import { AssessmentResponse } from './assessmentResponse.entity';

@Entity('assessmentItemResponse')
export class AssessmentItemResponse extends Model   {
    @Column()
    response: string;

    @ManyToOne(() => AssessmentItem, (assessmentItem) => assessmentItem.assessmentItemResponses, {
        nullable: true,
    })
    assessmentItem: AssessmentItem;

    @ManyToOne(() => AssessmentResponse, (assessmentResponse) => assessmentResponse.assessmentItemResponses, {
        nullable: true,
    })
    assessmentResponse: AssessmentResponse;

}