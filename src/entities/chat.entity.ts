import Model from './model.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../entities/user.entity';
import { Message } from './message.entity';

@Entity('chats')
export class Chat extends Model {
  @ManyToMany(() => User, (user) => user.chats, {
    nullable: true,
  })
  users: User[];

  @OneToMany(() => Message, (message) => message.chat, {
    nullable: true,
    cascade: true
  })
  messages: Message[];
}
