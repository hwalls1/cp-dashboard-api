import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('sessions')
export class Session extends Model {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    default: true,
  })
  valid: boolean;
}
