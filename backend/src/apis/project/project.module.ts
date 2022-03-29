import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../chatRoom/entities/chatRoom.entity';
import { ChatRoomMember } from '../chatRoomMember/entities/chatRoomMember.entity';
import { Location } from '../location/entities/location.entity';
import { Platform } from '../platform/entities/platform.entity';
import { Position } from '../position/entities/position.entity';
import { Type } from '../type/entities/type.entity';
import { User } from '../user/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectToPosition } from './entities/projectToPosition.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      User,
      Type,
      Location,
      Position,
      Platform,
      ProjectToPosition,
      ChatRoom,
      ChatRoomMember,
    ]),
  ],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
