import { Exercise } from './exercise.entity';
import Model from './model.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('settings')
export class Setting extends Model {

  @OneToMany(
    () => Exercise,
    (exercise) => exercise.onDashboard,
    {
      cascade: true,
    }
  )
  dashboardExercises: Exercise[];

  @OneToMany(
    () => Exercise,
    (exercise) => exercise.onLeaderboard,
    {
      cascade: true,
    }
  )
  leaderboardExercises: Exercise[];

  @Column({
    nullable: true
  })
  warmUpColor: string;


  @Column({
    nullable: true
  })
  mobilityColor: string;


  @Column({
    nullable: true
  })
  liftColor: string;


  @Column({
    nullable: true
  })
  throwColor: string;


  @Column({
    nullable: true
  })
  controlColor: string;
}
