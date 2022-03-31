import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';

interface IFindOne {
  boardId: string;
}

interface ICreate {
  createBoardInput: CreateBoardInput;
  userId: string;
  projectId: string;
}

interface IUpdate {
  boardId: string;
  updateBoardInput: UpdateBoardInput;
}

@Injectable()
export class BoardService {
  constructor(
  @InjectRepository(Board)
  private readonly boardRepository:Repository<Board>,

  @InjectRepository(User)
  private readonly userRepository:Repository<User>,

  @InjectRepository(Project)
  private readonly projectRepository:Repository<Project>
  ){}

  
  
  async findOne({boardId}: IFindOne) {
    return await this.boardRepository.findOne({id: boardId});
  }

  async create({userId, projectId, createBoardInput}: ICreate) {
    const user = await this.userRepository.findOne({id:userId})
    const project = await this.projectRepository.findOne({id:projectId})
    return await this.boardRepository.save({user:user,project:project, ...createBoardInput})
  }
 
  async update({boardId, updateBoardInput}: IUpdate) {
    const board = await this.boardRepository.findOne({id: boardId})
    const newBoard = {
      ...board,
      ...updateBoardInput
    }
    return await this.boardRepository.save(newBoard);
  }

  async delete({boardId}) {
    const result = await this.boardRepository.softDelete({id:boardId}); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
