import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Question } from './question.entity';
import { QuestionnaireResponse } from './questionnaireResponse.entity';

@Entity('questionResponse')
export class QuestionResponse extends Model {
  @Column()
  response: string;

  @OneToMany(() => Question, (question) => question.questionResponses, {
    nullable: true,
  })
  question: Question[];

  @ManyToOne(() => QuestionnaireResponse, (questionnaireResponse) => questionnaireResponse.questionnaire, {
    nullable: true,
  })
  questionnaireResponse: QuestionnaireResponse;
}
