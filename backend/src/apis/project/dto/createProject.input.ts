import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Project } from '../entities/project.entity';

@InputType()
export class CreateProjectInput extends OmitType(
  Project,
  [
    'id',
    'isComplete',
    'isStart',
    'createdAt',
    'deletedAt',
    'updatedAt',
    'type',
    'location',
    'leader',
    'point',
    'projectToPositions',
    'platforms',
<<<<<<< HEAD
    'users',
    'updatedAt'
    ,
=======
    'board',
    'task',
    'projectMembers',
    'chatRoom',
>>>>>>> 4c0cdb0f83c3686a25bd06de2d60caa01a859831
  ],
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
