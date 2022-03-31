import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  content!: string;

  @Field(() => Date)
  limit!: Date
}
