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
import { Questionnaire } from './questionnaire.entity';
import { QuestionResponse } from './questionResponse.entity';
import { User } from './user.entity';

@Entity('questionnaireResponses')
export class QuestionnaireResponse extends Model {
  @Column()
  dateResponded: string;

  @ManyToOne(() => User, (user) => user.questionnaireResponses, {
    nullable: true
  })
  user: User[];

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses, {
    nullable: true
  })
  questionnaire: Questionnaire;

  @OneToMany(
    () => QuestionResponse,
    (questionResponse) => questionResponse.questionnaireResponse,
    {
      cascade: true,
    }
  )
  questionResponses: QuestionResponse[];
}