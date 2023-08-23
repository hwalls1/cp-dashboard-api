import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Coach } from './coach.entity';
import { Pitch } from './pitch.entity';
import Model from './model.entity';
import { User } from './user.entity';
import { AthleteSchedule } from './athleteSchedule.entity';
import { CompletedWorkout } from './completedWorkout.entity';
import { CompletedExercise } from './completedExercise.entity';
import { AssessmentResponse } from './assessmentResponse.entity';

export enum HandedType {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum LevelType {
  HIGHSCHOOL = 'highschool',
  COLLEGE = 'college',
  PROFESSIONAL = 'professional',
}

@Entity('athletes')
export class Athlete extends Model {
  @Column()
  height: string;

  @Column()
  weight: number;

  @Column({
    nullable: true
  })
  age: number;

  @Column()
  organization: string;

  @Column({
    type: 'enum',
    enum: HandedType,
    default: HandedType.RIGHT,
  })
  handed: HandedType;

  @Column({
    type: 'enum',
    enum: LevelType,
    default: LevelType.COLLEGE,
  })
  level: LevelType;

  @OneToOne(() => User, (user) => user.athlete, {
    onUpdate: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.athletes, {
    nullable: true,
  })
  coach: Coach;

  @OneToOne(
    () => AthleteSchedule,
    (athleteSchedule) => athleteSchedule.athlete,
    {
      cascade: true,
    }
  )
  @JoinColumn()
  athleteSchedule: AthleteSchedule;

  @OneToMany(
    () => CompletedWorkout,
    (completedWorkout) => completedWorkout.athlete
  )
  completedWorkout: CompletedWorkout;

  @OneToMany(
    () => CompletedExercise,
    (completedExercise) => completedExercise.athlete
  )
  completedExercise: CompletedExercise;

  @OneToMany(() => Pitch, (pitch) => pitch.athlete)
  pitches: Pitch[];

  @OneToMany(
    () => AssessmentResponse, 
    (assessmentResponse) => assessmentResponse.athlete,
    {
       nullable: true
    }
  )
  assessmentResponses: AssessmentResponse[];

}