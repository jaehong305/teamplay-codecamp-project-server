import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../location/entities/location.entity';
import { Platform } from '../platform/entities/platform.entity';
import { Position } from '../position/entities/position.entity';
import { Type } from '../type/entities/type.entity';
import { User } from '../user/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectToPosition } from './entities/projectToPosition.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,

    @InjectRepository(ProjectToPosition)
    private readonly projectToPositionRepository: Repository<ProjectToPosition>,
  ) {}

  async findOne({ projectId }) {
    return await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['type', 'location', 'leader', 'projectToPositions', 'platforms'],
    });
  }

  async find() {
    return await this.projectRepository.find();
  }

  async create({ leaderId, createProjectInput }) {
    const { typeId, locationId, positionIds, numbers, platformIds, ...rest } = createProjectInput;

    const leader = await this.userRepository.findOne({ id: leaderId });
    const type = await this.typeRepository.findOne({ id: typeId });
    const location = await this.locationRepository.findOne({ id: locationId });
    const positions = await Promise.all(positionIds.map(id => this.positionRepository.findOne({ id })));
    const platforms = await Promise.all(platformIds.map(id => this.platformRepository.findOne({ id })));

    const project = await this.projectRepository.save({
      leader,
      type,
      location,
      platforms,
      ...rest,
    });

    await Promise.all(
      positions.map((position, i) => {
        return this.projectToPositionRepository.save({
          project,
          position,
          number: numbers[i],
        });
      }),
    );

    return project;
  }
}
