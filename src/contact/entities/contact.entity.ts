import { Person } from '../../person/entities/person.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNotEmpty()
  value: string;

  @ManyToOne(() => Person, (person) => person.contacts)
  @JoinColumn({ name: 'personId' })
  person: Person;
}
