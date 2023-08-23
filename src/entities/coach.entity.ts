import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Athlete } from './athlete.entity';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('coaches')
export class Coach extends Model {
  @Column()
  organization: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Athlete, (athlete) => athlete.coach, {
    nullable: true,
  })
  athletes: Athlete[];
}
