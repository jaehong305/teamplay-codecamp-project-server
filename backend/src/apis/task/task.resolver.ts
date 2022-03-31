import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Task)
  async fetchTask(@Args('taskId') taskId: string) {
    return await this.taskService.findOne({taskId});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @Args('projectId') projectId: string,
    @Args('taskTypeId') taskTypeId: string,
    @CurrentUser() currentUser: ICurrentUser
    ) {
      const userId = currentUser.id
    return await this.taskService.create({userId, projectId, createTaskInput});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Task)
  async updateTask(
    @Args('taskId') taskId: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ) {
    return await this.taskService.update({taskId, updateTaskInput});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteTask(
    @Args('taskId') taskId: string) {
    return await this.taskService.delete({taskId})};
}
