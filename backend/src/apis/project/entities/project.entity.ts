import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { Location } from 'src/apis/location/entities/location.entity';
import { Platform } from 'src/apis/platform/entities/platform.entity';
import { Type } from 'src/apis/type/entities/type.entity';
import { User } from 'src/apis/user/entities/user.entity';
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
import { ProjectToPosition } from './projectToPosition.entity';

export enum METHOD_ENUM {
  MEET = 'MEET',
  UNTACT = 'UNTACT',
  MEDIATE = 'MEDIATE',
}
registerEnumType(METHOD_ENUM, {
  name: 'METHOD_ENUM',
});

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column()
  @Field(() => String)
  name!: string;

  @Column()
  @Field(() => String)
  teamname!: string;

  @Column()
  @Field(() => String)
  intro!: string;

  @Column({ type: 'enum', enum: METHOD_ENUM })
  @Field(() => METHOD_ENUM)
  method!: METHOD_ENUM;

  @Column()
  @Field(() => Date)
  recruitDate!: Date;

  @Column()
  @Field(() => String)
  imgUrl!: string;

  @Column()
  @Field(() => String)
  skill!: string;

  @Column({ type: 'text' })
  @Field(() => String)
  description!: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isComplete!: boolean;

  @ManyToOne(() => Type, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Type)
  type!: Type;

  @ManyToOne(() => Location, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Location)
  location!: Location;

  @ManyToOne(() => User)
  @Field(() => User)
  leader!: User;

  @OneToMany(() => ProjectToPosition, projectToPosition => projectToPosition.project)
  @Field(() => [ProjectToPosition])
  projectToPositions!: ProjectToPosition[];

  @JoinTable()
  @ManyToMany(() => Platform, platform => platform.projects)
  @Field(() => [Platform])
  platforms!: Platform[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt!: Date;

  @OneToMany(() => Board, board => board.user)
  board: Board;
}
