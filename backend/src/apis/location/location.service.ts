import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly lcoationRepository: Repository<Location>,
  ) {}

  async findAll() {
    return await this.lcoationRepository.find();
  }

  async create({ name }) {
    return await this.lcoationRepository.save({ name });
  }
}
