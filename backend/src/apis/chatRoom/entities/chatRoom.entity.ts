import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/apis/chatRoom/entities/chat.entity';
import { ChatRoomMember } from 'src/apis/chatRoom/entities/chatRoomMember.entity';
import { Project } from 'src/apis/project/entities/project.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column()
  @Field(() => String)
  name!: string;

  @JoinColumn()
  @OneToOne(() => Project)
  @Field(() => Project)
  project!: Project;

  @OneToMany(() => Chat, chat => chat.chatRoom)
  @Field(() => [Chat])
  chat: Chat[];

  @OneToMany(() => ChatRoomMember, chatRoomMember => chatRoomMember.chatRoom)
  @Field(() => [ChatRoomMember])
  chatRoomMembers!: ChatRoomMember[];
}
