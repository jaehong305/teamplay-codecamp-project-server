import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  create(createTaskInput: CreateTaskInput) {
    return 'This action adds a new tesk';
  }

  findAll() {
    return `This action returns all tesk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tesk`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} tesk`;
  }

  remove(id: number) {
    return `This action removes a #${id} tesk`;
  }
}
