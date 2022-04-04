import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board])
  async fetchBoards() {
    return await this.boardService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Board)
  async fetchBoard(@Args('boardId') boardId: string) {
    return await this.boardService.findOne({boardId});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Args('title') title: string,
    @Args('content') content: string,
    @CurrentUser() currentUser: ICurrentUser
  ) {
    const writerId = currentUser.id;
    return await this.boardService.create({writerId, title, content});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('boardId') boardId: string,
    @Args('title') title: string,
    @Args('content') content: string,
    @CurrentUser() currentUser: ICurrentUser
    ) {
      const updateUser = currentUser.id;
    return await this.boardService.update({boardId, title, content, updateUser});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean )
  async deleteBoard( 
    @Args('boardId') boardId: string) {
    return await this.boardService.delete({boardId})};
}
