import { Person } from '../../person/entities/person.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ContactType } from '../dto/contact-type.enum';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({
    type: 'enum',
    enum: ContactType,
    default: ContactType.Phone,
  })
  @IsNotEmpty()
  type: ContactType;

  @Column()
  @IsNotEmpty()
  value: string;

  @ManyToOne(() => Person, (person) => person.contacts)
  @JoinColumn({ name: 'personId' })
  person: Person;
}
