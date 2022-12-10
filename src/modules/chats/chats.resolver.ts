import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Message } from './entities/message.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Chat)
export class ChatsResolver {
  private pubSub: PubSub;

  constructor(private readonly chatsService: ChatsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Chat])
  @UseGuards(JwtAuthGuard)
  getChats(@Context() context): Promise<Chat[]> {
    return this.chatsService.getChats(context.req.user.username);
  }

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  createChat(@Args('to') to: string, @Context() context): Promise<Chat> {
    return this.chatsService.createChat(context.req.user.username, to);
  }

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('chatId') chatId: string,
    @Args('to') to: string,
    @Args('message') message: string,
    @Context() context,
  ): Promise<Chat> {
    const chat = await this.chatsService.getChat(chatId);
    const newMessage = await this.chatsService.sendMessage(
      chatId,
      context.req.user.username,
      to,
      message,
    );
    chat.messages.push(newMessage);
    this.pubSub.publish('subscribeChats', {
      subscribeChats: chat,
    });
    return chat;
  }

  @Subscription(() => Chat, {
    filter: async (payload, variables) => {
      const chat = await payload.subscribeChats;
      return chat.members.some((member) => member === variables.username);
    }
  })
  subscribeChats(@Args('username') username: string) {
    return this.pubSub.asyncIterator('subscribeChats');
  }
}
