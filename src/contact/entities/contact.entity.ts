import { Person } from '../../person/entities/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => Person, (person) => person.contacts)
  person: Person;
}
