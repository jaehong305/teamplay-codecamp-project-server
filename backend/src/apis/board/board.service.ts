import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';


@Injectable()
export class BoardService {
  constructor(
  @InjectRepository(Board)
  private readonly boardRepository:Repository<Board>,
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

  async create({writerId, title, content}) {
    return await this.boardRepository.save({writerId, title, content})
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
