import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/apis/project/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column({ unique: true })
  @Field(() => String)
  name!: string;

  @ManyToMany(() => Project, project => project.positions)
  @Field(() => [Project])
  projects!: Project[];
}
