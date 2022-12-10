import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string;
}
