import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task, TASK_TYPE_ENUM } from './entities/task.entity';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { User } from '../user/entities/user.entity';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Task])
  async fetchTasks() {
    return await this.taskService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Task)
  async fetchTask(@Args('taskId') taskId: string) {
    return await this.taskService.findOne({taskId});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Task)
  async createTask(
    @Args('content') content: string,
    @Args('limit') limit: Date,
    @Args({name:'taskType', type: () => TASK_TYPE_ENUM }) taskType: TASK_TYPE_ENUM,
    @Args({ name: 'dutyMember', type: () => [String]}) dutyMember: User[],
    @Args('projectId') project: string,
    @CurrentUser() currentUser: ICurrentUser
    ) {
    const createUser = currentUser.id;
    return await this.taskService.create({ createUser, content, limit, taskType, dutyMember, project});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Task)
  async updateTask(
    @Args('taskId') taskId: string,
    @Args('content') content: string,
    @Args('limit') limit: Date,
    @Args({name:'taskType', type: () => TASK_TYPE_ENUM }) taskType: TASK_TYPE_ENUM,
    @Args({ name: 'dutyMember', type: () => [String]}) dutyMember: User[],
    @CurrentUser() currentUser: ICurrentUser
  ) {
    const updateUser = currentUser.id;
    return await this.taskService.update({taskId, updateUser, content, limit, taskType, dutyMember});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteTask(
    @Args('taskId') taskId: string) {
    return await this.taskService.delete({taskId})};
}
