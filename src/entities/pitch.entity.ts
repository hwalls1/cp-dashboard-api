import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Athlete } from './athlete.entity';
import { CompletedWorkout } from './completedWorkout.entity';

//  pitch types
export enum PitchType {
  FASTBALL = 'fastball',
  CHANGEUP = 'changeup',
  CURVEBALL = 'curveball',
  SLIDER = 'slider',
  TWOSEAM = 'twoseam',
  CUTTER = 'cutter',
  SINKER = 'sinker',
  SLURVE = 'slurve',
}

export enum ThrowType {
  LONGTOSS = 'longtoss',
  DRILL = 'drill',
  MOUND = 'mound',
  PULLDOWN = 'pulldown',
  FLATGROUND = 'flatground',
  PLYO = 'plyo',
}

@Entity('pitches')
export class Pitch extends Model {
  @Column()
  date: string;

  @ManyToOne(() => Athlete, (athlete) => athlete.pitches)
  @JoinColumn()
  athlete: Athlete;

  @ManyToOne(
    () => CompletedWorkout,
    (completedWorkout) => completedWorkout.pitches
  )
  @JoinColumn()
  completedWorkout: CompletedWorkout;

  @Column({
    type: 'enum',
    enum: PitchType,
    default: PitchType.FASTBALL,
  })
  type: PitchType;

  @Column({
    type: 'enum',
    enum: ThrowType,
    default: ThrowType.DRILL,
  })
  throwType: ThrowType;

  @Column()
  velocity: number;

  @Column()
  distance: number;

  @Column({
    nullable: true
  })
  xCoordinate: number;

  @Column({
    nullable: true
  })
  yCoordinate: number;
}
