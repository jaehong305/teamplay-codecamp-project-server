import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

interface IFindOne {
  taskId: string;
}

interface ICreate {
  userId: string
  projectId: string
  createTaskInput: CreateTaskInput;
}

interface IUpdate {
  taskId: string;
  updateTaskInput: UpdateTaskInput;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
  
    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>
  ){}

  async findOne({taskId}: IFindOne) {
    return await this.taskRepository.findOne({id:taskId})
  }

  async create({userId, projectId, createTaskInput}: ICreate) {
    const user = await this.userRepository.findOne({id:userId})
    const project = await this.projectRepository.findOne({id:projectId})
    return await this.taskRepository.save({user:user,project:project, ...createTaskInput})
  }

  async update( {taskId, updateTaskInput}: IUpdate) {
    const task = await this.taskRepository.findOne({id: taskId})
    const newTask = {
      ...task,
      ...updateTaskInput
    }
    return await this.taskRepository.save(newTask)
  }

  async delete({taskId}) {
    const result = await this.taskRepository.softDelete({id:taskId}); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}