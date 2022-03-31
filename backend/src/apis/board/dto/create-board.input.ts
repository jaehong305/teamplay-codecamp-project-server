import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string
}
