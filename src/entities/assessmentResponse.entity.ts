import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Model from './model.entity';
import { Assessment } from './assessment.entity';
import { AssessmentItemResponse } from './assessmentItemResponse.entity';
import { Athlete } from './athlete.entity';

@Entity('assessmentResponses')
export class AssessmentResponse extends Model   {

    @Column()
    dateResponded: string;

    @ManyToOne(() => Athlete, (athlete) => athlete.assessmentResponses, {
        cascade: true,
        nullable: true
    })
    athlete: Athlete[];

    @ManyToOne(() => Assessment, (assessment) => assessment.responses,  {
        onDelete: "SET NULL",
        nullable: true
    })
    assessment: Assessment;

    @OneToMany(
        () => AssessmentItemResponse,
        (assessmentItemResponse) => assessmentItemResponse.assessmentResponse,
        {
            cascade: ['insert', 'update'],
            onDelete: "SET NULL",
            nullable: true,
        }
    )
    assessmentItemResponses: AssessmentItemResponse[];
}