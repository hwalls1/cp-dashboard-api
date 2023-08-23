import { Column, Entity, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Question } from './question.entity';
import { QuestionnaireResponse } from './questionnaireResponse.entity';

@Entity('questionnaires')
export class Questionnaire extends Model {
  @Column()
  dateToShow: string;

  @Column()
  title: string;

  @OneToMany(() => Question, (question) => question.questionnaire, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(
    () => QuestionnaireResponse,
    (questionnaireResponse) => questionnaireResponse.questionnaire
  )
  responses: QuestionnaireResponse[];
}
