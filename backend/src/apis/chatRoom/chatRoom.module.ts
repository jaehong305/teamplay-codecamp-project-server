import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomResolver } from './chatRoom.resolver';
import { ChatRoomService } from './chatRoom.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ChatRoomResolver, ChatRoomService],
})
export class ChatRoomModule {}
