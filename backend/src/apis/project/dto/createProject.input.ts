import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Project } from '../entities/project.entity';

@InputType()
export class CreateProjectInput extends OmitType(
  Project,
  ['id', 'isComplete', 'createdAt', 'deletedAt', 'type', 'location', 'leader', 'projectToPositions', 'platforms'],
  InputType,
) {
  @Field(() => String)
  typeId!: string;

  @Field(() => String)
  locationId!: string;

  @Field(() => [String])
  positionIds!: string[];

  @Field(() => [Int])
  numbers!: number[];

  @Field(() => [String])
  platformIds!: string[];
}