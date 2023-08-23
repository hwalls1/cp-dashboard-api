import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Workout } from './workout.entity';
import { Setting } from './setting.entity';

export enum ExerciseType {
  THROW = 'throw',
  TIMED = 'timed',
  WEIGHTED = 'weighted',
  BODYWEIGHT = 'bodyweight',
  COMMAND = 'command',
}

@Entity('exercises')
export class Exercise extends Model {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: ExerciseType,
    default: ExerciseType.BODYWEIGHT,
  })
  type: ExerciseType;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  link: string;

  @Column({
    nullable: true,
  })
  notes: string;

  @Column({
    nullable: true,
    default: 0
  })
  sets: number;

  @Column({
    nullable: true,
    default: 0
  })
  reps: number;

  @Column({
    nullable: true,
    default: 0
  })
  time: number;

  @ManyToMany(() => Workout, (workout) => workout.exercises, {
    nullable: true,
  })
  workouts: Workout[];

  @ManyToOne(() => Setting)
  onDashboard: Setting;

  @ManyToOne(() => Setting)
  onLeaderboard: Setting;
  
}
