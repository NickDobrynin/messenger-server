import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectIdColumn, PrimaryColumn, Column, Entity } from 'typeorm';
import { Message } from './message.entity';

@Entity('chats')
@ObjectType()
export class Chat {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => [String])
  members: string[];

  @Column()
  @Field(() => [Message])
  messages: Message[];
}
