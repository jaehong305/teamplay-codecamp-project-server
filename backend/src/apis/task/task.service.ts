import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Task, TASK_TYPE_ENUM } from './entities/task.entity';

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

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne({taskId}) {
    return await this.taskRepository.findOne({
      where: {id:taskId},
      relations: ['user', 'project'],
    })
  }

  // 업무 추가하기 기능
  async create({ createUser, content, limit, taskType, dutyMember, project }) {
    const writer = await this.userRepository.findOne({id:createUser})
    const dutymember= await this.userRepository.find({id: dutyMember})
    const projectId = await this.projectRepository.findOne({id: project})
    return await this.taskRepository.save({user:writer, content, limit, taskType, dutyMember: dutymember, project: projectId})
  }

  async update( {taskId, updateUser, content, limit, taskType, dutyMember}) {
    const task = await this.taskRepository.findOne({id: taskId})
    const newTask = {
      ...task,
      updateUser,
      content,
      limit,
      taskType,
      dutyMember
    }
    console.log
    return await this.taskRepository.save(newTask)
  }

  async delete({taskId}) {
    const result = await this.taskRepository.softDelete({id:taskId}); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}