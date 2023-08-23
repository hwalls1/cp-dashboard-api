import Model from './model.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../entities/user.entity';
import { Chat } from './chat.entity';

@Entity('messages')
export class Message extends Model {
  
  @ManyToOne(() => Chat, (chat) => chat.messages, {
    nullable: true,
  })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.sentMessages, {
    nullable: true,
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.recievedMessages, {
    nullable: true,
  })
  recipient: User;

  @Column()
  body: string;
}
