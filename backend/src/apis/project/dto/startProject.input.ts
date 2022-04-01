import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StartProjectInput {
  @Field(() => String)
  projectId!: string;

  @Field(() => [String])
  userIds!: string[];
}
