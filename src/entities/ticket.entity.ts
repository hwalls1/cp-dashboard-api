import Model from './model.entity';
import { Column, Entity } from 'typeorm';

@Entity('tickets')
export class Ticket extends Model {
  @Column()
  subject: string;

  @Column()
  sender: number;

  @Column()
  recipient: number;

  @Column()
  body: string;
}
