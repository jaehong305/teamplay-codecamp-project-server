import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  accessToken!: string;

  @Field(() => Boolean)
  onboarding!: boolean;
}
