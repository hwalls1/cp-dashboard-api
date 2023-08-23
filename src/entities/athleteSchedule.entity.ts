import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Athlete } from './athlete.entity';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('athleteSchedule')
export class AthleteSchedule extends Model {
  @OneToOne(() => Athlete, (athlete) => athlete.athleteSchedule)
  athlete: Athlete;

  @Column({
    nullable: true,
  })
  workouts: string;
}
