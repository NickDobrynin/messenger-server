import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './modules/auth/auth.module';
import { ChatsModule } from './modules/chats/chats.module';
import { Chat } from './modules/chats/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://username:username@messengerdb.jnwx7lt.mongodb.net/messengerDB?retryWrites=true&w=majority',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Chat],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      // sortSchema: true,
      driver: ApolloDriver,
      cache: 'bounded',
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql/subscription',
          onConnect: (connectionParams) => {
            return {
              req: {
                headers: { authorization: connectionParams.Authorization },
              },
            };
          },
        },
      },
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
  ],
})
export class AppModule {}
