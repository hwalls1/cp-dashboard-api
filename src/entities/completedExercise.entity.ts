import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { CompletedWorkout } from './completedWorkout.entity';
import { Athlete } from './athlete.entity';

//  completed exercise types
export enum CompletedExerciseType {
  THROW = 'throw',
  TIMED = 'timed',
  WEIGHTED = 'weighted',
  BODYWEIGHT = 'bodyweight',
  COMMAND = 'command',
}

@Entity('completedExercises')
export class CompletedExercise extends Model {
  @Column()
  exerciseId: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  date: string;

  @Column({
    type: 'enum',
    enum: CompletedExerciseType,
    default: CompletedExerciseType.BODYWEIGHT,
  })
  type: CompletedExerciseType;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  prescribedWeight: number;

  @Column()
  recordedValue: number;

  @ManyToOne(() => Athlete)
  @JoinColumn()
  athlete: Athlete;

  @ManyToOne(() => CompletedWorkout)
  completedWorkout: CompletedWorkout;
}
