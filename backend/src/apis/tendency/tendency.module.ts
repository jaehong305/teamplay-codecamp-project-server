import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TendencyResolver } from './tendency.resolver';
import { TendencyService } from './tendency.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [TendencyResolver, TendencyService],
})
export class TendencyModule {}
