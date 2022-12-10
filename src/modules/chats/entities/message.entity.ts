import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Message {
  @PrimaryColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  chatId: string;

  @Column()
  @Field()
  message: string;

  @Column()
  @Field()
  from: string;

  @Column()
  @Field()
  to: string;

  @Column()
  @Field()
  date: string;
}
