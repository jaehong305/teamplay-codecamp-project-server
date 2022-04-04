import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll({ projectId }) {
    return await this.boardRepository.find({
      where: { project: projectId },
      relations: ['user'],
    });
  }

  async findOne({ boardId }) {
    return await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
  }

  async create({ projectId, writerId, title, content }) {
    const user = await this.userRepository.findOne({ id: writerId });
    const project = await this.projectRepository.findOne({ id: projectId });
    return await this.boardRepository.save({ user, title, content, project });
  }

  async update({ boardId, title, content, updateUser }) {
    const user = await this.userRepository.findOne({ id: updateUser.id });
    const board = await this.boardRepository.findOne({ where: { id: boardId }, relations: ['user'] });
    if (user.id !== board.user.id) throw new UnauthorizedException('자신의 글만 수정 가능합니다.');
    const newBoard = {
      ...board,
      title,
      content,
    };
    return await this.boardRepository.save(newBoard);
  }

  async delete({ boardId }) {
    const result = await this.boardRepository.softDelete({ id: boardId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
