import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Questionnaire } from './questionnaire.entity';
import { QuestionResponse } from './questionResponse.entity';

export enum ResponseType {
  SCALE = 'scale',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  TEXT = 'text',
}

@Entity('questions')
export class Question extends Model {
  @Column()
  question: string;

  @Column({
    type: 'enum',
    enum: ResponseType,
    default: ResponseType.SCALE,
  })
  responseType: ResponseType;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions, {
    nullable: true,
  })
  questionnaire: Questionnaire;

  @ManyToOne(
    () => QuestionResponse,
    (questionResponse) => questionResponse.question,
    {
      nullable: true,
    }
  )
  questionResponses: QuestionResponse[];
}
