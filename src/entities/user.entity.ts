import crypto from 'crypto';
import { Entity, Column, Index, BeforeInsert, OneToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import { Athlete } from './athlete.entity';
import { Coach } from './coach.entity';
import { QuestionnaireResponse } from './questionnaireResponse.entity';
import { File } from './file.entity';
import { Message } from '../entities/message.entity';
import { Chat } from './chat.entity';

export enum RoleEnumType {
  USER = 'user',
  ATHLETE = 'athlete',
  COACH = 'coach',
  ADMIN = 'admin',
}

export enum StatusEnumType {
  APPROVED = 'approved',
  LOCKED = 'locked'
}

@Entity('users')
export class User extends Model {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  @OneToOne(() => File, {
    nullable: true,
    cascade: true
  })
  @JoinColumn()
  profilePicture: File;

  @OneToOne(() => Athlete, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  athlete: Athlete;

  @OneToOne(() => Coach, {
    nullable: true,
    cascade: true
  })
  @JoinColumn()
  coach: Coach;

  @Column({
    type: 'enum',
    enum: StatusEnumType,
    default: StatusEnumType.APPROVED,
  })
  status: StatusEnumType;

  @Column({
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  verificationCode: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  passwordResetCode: string | null;

  @OneToMany(
    () => QuestionnaireResponse,
    (questionnaireResponse) => questionnaireResponse.user,
    {
      nullable: true,
    }
  )
  questionnaireResponses: QuestionnaireResponse[];

 @OneToMany(
    () => Message,
    (message) => message.sender,
    {
      nullable: true,
    }
  )
  sentMessages: Message[];


  @OneToMany(
    () => Message,
    (message) => message.recipient,
    {
      nullable: true,
    }
  )
  recievedMessages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users, {
    nullable: true,
  })
  @JoinTable()
  chats: Chat[];

  @OneToMany(
    () => File,
    (file) => file.owner,
    {
      nullable: true,
    }
  )
  files: File[];

  // See https://typeorm.io/decorator-reference#beforeinsert
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeInsert()
  newVerificationCode() {
    return (this.verificationCode = crypto.randomUUID());
  }

  async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      verificationCode: undefined,
    };
  }
}
