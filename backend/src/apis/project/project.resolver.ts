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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Project)
  async createProject(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return await this.projectService.create({ leaderId: currentUser.id, createProjectInput });
  }
}
