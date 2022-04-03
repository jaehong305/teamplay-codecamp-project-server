import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { CreateProjectInput } from './dto/createProject.input';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => Project)
  async fetchProject(@Args('projectId') projectId: string) {
    return await this.projectService.findOne({ projectId });
  }

  @Query(() => [Project])
  async fetchProjects(@Args('page') page: number) {
    return this.projectService.find({ page });
  }

  @Query(() => Number)
  async fetchProjectCounts() {
    return this.projectService.findCount();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Project])
  async fetchMyProjects(@CurrentUser() currentUser: ICurrentUser) {
    return await this.projectService.findMyProjects({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Project)
  async createProject(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return await this.projectService.create({ leaderId: currentUser.id, createProjectInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Project)
  async startProject(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('chatRoomId') chatRoomId: string,
    @Args({ name: 'userIds', type: () => [String] }) userIds: string[],
    @Args('point') point: number,
  ) {
    return await this.projectService.createProjectMember({ chatRoomId, userIds, leaderId: currentUser.id, point });
  }

  @Mutation(() => Boolean)
  async deleteAllProject() {
    return await this.projectService.deleteAll();
  }

  @Mutation(() => Boolean)
  async deleteProject(@Args('projectId') projectId: string) {
    return await this.projectService.delete({ projectId });
  }
}
