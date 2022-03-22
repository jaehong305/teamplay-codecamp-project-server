import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/createUser.Input';
import { UserService } from './user.service';
import { BadRequestException, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => String)
  async sendTokenToEmail(@Args('email') email: string) {
    if (this.userService.checkValidationEmail({ email })) {
      const mytoken = this.userService.getToken(6);
      const template = this.userService.getTemplateToken({ mytoken });
      // await this.userService.sendEmail({ email, template });
      await this.cacheManager.set(email, mytoken, { ttl: 180000 });
      return `${email}으로 인증번호가 전송되었습니다. ${mytoken}`;
    } else {
      throw new BadRequestException('이메일을 확인해주세요');
    }
  }

  @Mutation(() => Boolean)
  async checkTokenToEmail(@Args('email') email: string, @Args('token') token: string) {
    const mytoken = await this.cacheManager.get(email);
    if (token !== mytoken) throw new BadRequestException('인증번호를 확인해주세요.');

    await this.cacheManager.set(email, true, { ttl: 600000 });
    return true;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.userService.checkUser({ createUserInput });
    const checkEmail = await this.cacheManager.get(createUserInput.email);
    if (checkEmail !== true) throw new UnauthorizedException('이메일을 인증해주세요.');

    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return await this.userService.create({ createUserInput });
  }
}
