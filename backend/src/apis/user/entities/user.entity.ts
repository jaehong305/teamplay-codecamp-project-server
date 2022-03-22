import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Tendency } from 'src/apis/tendency/entities/tendency.entity';

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

  @JoinTable()
  @ManyToMany(() => Tendency, tendency => tendency.users)
  @Field(() => [Tendency])
  tendencys?: Tendency[];
}
