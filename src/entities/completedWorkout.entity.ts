import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { CompletedExercise } from './completedExercise.entity';
import { Athlete } from './athlete.entity';
import { Pitch } from './pitch.entity';
import { File } from './file.entity';

//  completed workout types
export enum CompletedWorkoutType {
  NONE = 'none',
  LIFT = 'lift',
  COMMAND = 'command',
  THROW = 'throw',
  MOBILITY = 'mobility',
}

@Entity('completedWorkouts')
export class CompletedWorkout extends Model {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: CompletedWorkoutType,
    default: CompletedWorkoutType.LIFT,
  })
  type: CompletedWorkoutType;

  @ManyToOne(() => Athlete)
  @JoinColumn()
  athlete: Athlete;

  @OneToMany(() => Pitch, (pitch) => pitch.completedWorkout, {
    nullable: true,
  })
  pitches: Pitch[];

  @OneToMany(
    () => CompletedExercise,
    (completedExercise) => completedExercise.completedWorkout,
    {
      cascade: true,
    }
  )
  completedExercises: CompletedExercise[];

  @OneToMany(
    () => File,
    (file) => file.completedWorkout,
    {
      cascade: true,
      nullable: true
    }
  )
  files: File[];
}
