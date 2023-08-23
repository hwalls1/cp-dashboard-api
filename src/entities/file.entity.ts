import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { CompletedWorkout } from './completedWorkout.entity';
import { User } from './user.entity';

@Entity('files')
export class File extends Model {
  @Column()
  dateUploaded: string;

  @Column({
    nullable: true
  })
  type: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column()
  src: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => CompletedWorkout, (completedWorkout) => completedWorkout.files, {
    nullable: true,
  })
  completedWorkout: CompletedWorkout;

  @ManyToOne(() => User, (user) => user.files, {
    nullable: true,
  })
  owner: User;
}
