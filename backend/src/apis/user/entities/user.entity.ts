import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Tendency } from 'src/apis/tendency/entities/tendency.entity';
import { Position } from 'src/apis/position/entities/position.entity';
import { Type } from 'src/apis/type/entities/type.entity';
import { ChatRoomMember } from 'src/apis/chatRoom/entities/chatRoomMember.entity';

export enum CAREER_ENUM {
  STUDENT = 'STUDENT',
  JOBSEEKER = 'JOBSEEKER',
  NEWCOMER = 'NEWCOMER',
}
registerEnumType(CAREER_ENUM, {
  name: 'CAREER_ENUM',
});

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  @Field(() => String)
  email!: string;

  @Column()
  password!: string;

  @Column()
  @Field(() => String)
  name!: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Column({ type: 'enum', enum: CAREER_ENUM })
  @Field(() => CAREER_ENUM, { nullable: true })
  career?: CAREER_ENUM;

  @Column({ default: 0 })
  @Field(() => Int)
  point!: number;

  @JoinTable()
  @ManyToMany(() => Tendency, tendency => tendency.users)
  @Field(() => [Tendency], { nullable: true })
  tendencys?: Tendency[];

  @ManyToOne(() => Position, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Position, { nullable: true })
  position?: Position;

  @JoinTable()
  @ManyToMany(() => Type, type => type.users)
  @Field(() => [Type], { nullable: true })
  types?: Type[];

  @OneToMany(() => ChatRoomMember, chatRoomMember => chatRoomMember.user)
  @Field(() => [ChatRoomMember])
  chatRoomMembers!: ChatRoomMember[];
}
