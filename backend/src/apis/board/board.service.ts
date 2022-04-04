import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';


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

  async findAll() {
    return await this.boardRepository.find({
      relations: ['user', 'project'],
    });
  }

  async findOne({boardId}) {
  return await this.boardRepository.findOne({
      where: {id:boardId},
      relations: ['user', 'project'],
    })
  }

  async create({createUser, title, content, project}) {
    const createuser = await this.userRepository.findOne({id:createUser})
    const projectId = await this.projectRepository.findOne({id:project})
    return await this.boardRepository.save({user:createuser, title, content, project:projectId})
  }
 
  async update({boardId, title, content, updateUser}) {
    const board = await this.boardRepository.findOne({id: boardId})
    const newBoard = {
      ...board,
      updateUser,
      title,
      content
    }
    return await this.boardRepository.save(newBoard);
  }

  async delete({boardId}) {
    const result = await this.boardRepository.softDelete({id:boardId}); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
