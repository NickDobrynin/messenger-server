import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class SignInResponse {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
