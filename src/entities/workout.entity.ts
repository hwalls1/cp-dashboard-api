import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Exercise } from './exercise.entity';
import Model from './model.entity';

//  workout types
export enum WorkoutType {
  LIFT = 'lift',
  COMMAND = 'command',
  THROW = 'throw',
  MOBILITY = 'mobility',
}

@Entity('workouts')
export class Workout extends Model {
  @Column()
  name: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  notes: string;

  @ManyToMany(() => Exercise, (exercise) => exercise.workouts, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable()
  exercises: Exercise[];

  @Column({
    nullable: true,
  })
  exerciseOrder: string;

}
