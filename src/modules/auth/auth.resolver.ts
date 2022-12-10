import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in-response';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { SignUpInput } from './dto/sign-up.input';
import { SignUpResponse } from './dto/sign-up-response';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthResponse } from './dto/auth-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthResponse)
  @UseGuards(JwtAuthGuard)
  auth(@Context() context) {
    return this.authService.auth(context.req.user.username);
  }

  @Mutation(() => SignInResponse)
  @UseGuards(LocalAuthGuard)
  signIn(@Args('signInInput') signInInput: SignInInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignUpResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }
}
