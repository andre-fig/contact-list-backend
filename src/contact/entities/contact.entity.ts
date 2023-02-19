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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier of a contact',
  })
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    example: 'phone',
    description: 'The type of a contact',
  })
  @Column({
    type: 'enum',
    enum: ContactType,
    default: ContactType.Phone,
  })
  @IsNotEmpty()
  type: ContactType;

  @ApiProperty({
    type: String,
    example: '123456789',
    description: 'The value of a contact',
  })
  @Column()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    type: Person,
    example: { id: 1, name: 'John Doe' },
    description: 'The personId of a contact',
  })
  @ManyToOne(() => Person, (person) => person.contacts)
  @JoinColumn({ name: 'personId' })
  person: Person;
}
