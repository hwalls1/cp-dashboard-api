import { DataSource } from 'typeorm';
import config from 'config';
import { Assessment } from '../entities/assessment.entity';
import { AssessmentItem } from '../entities/assessmentItem.entity';
import { Athlete } from '../entities/athlete.entity';
import { AthleteSchedule } from '../entities/athleteSchedule.entity';
import { Coach } from '../entities/coach.entity';
import { CompletedExercise } from '../entities/completedExercise.entity';
import { CompletedWorkout } from '../entities/completedWorkout.entity';
import { Exercise } from '../entities/exercise.entity';
import Model from '../entities/model.entity';
import { Pitch } from '../entities/pitch.entity';
import { Question } from '../entities/question.entity';
import { Session } from '../entities/session.entity';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../entities/user.entity';
import { Workout } from '../entities/workout.entity';
import { Questionnaire } from '../entities/questionnaire.entity';
import { QuestionnaireResponse } from '../entities/questionnaireResponse.entity';
import { QuestionResponse } from '../entities/questionResponse.entity';
import { File } from '../entities/file.entity';
import { AssessmentResponse } from '../entities/assessmentResponse.entity';
import { AssessmentItemResponse } from '../entities/assessmentItemResponse.entity';
import { Setting } from '../entities/setting.entity';
import { Message } from '../entities/message.entity';
import { Chat } from '../entities/chat.entity';

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

const AppDataSource = new DataSource({
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'api',
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [
    Assessment,
    AssessmentItem,
    Athlete,
    AthleteSchedule,
    Coach,
    CompletedExercise,
    CompletedWorkout,
    Exercise,
    Model,
    Pitch,
    Question,
    Questionnaire,
    QuestionnaireResponse,
    QuestionResponse,
    Session,
    Ticket,
    User,
    Workout,
    File,
    AssessmentResponse,
    AssessmentItemResponse,
    Setting,
    Message,
    Chat,
  ],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

export default AppDataSource;
