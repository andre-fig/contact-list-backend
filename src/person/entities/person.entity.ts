import { Contact } from '../../contact/entities/contact.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Person {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier of a person',
  })
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'The name of a person',
  })
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Contact,
    isArray: true,
    example: [
      {
        id: 1,
        type: 'email',
        value: 'john.doe@email.com',
      },
      {
        id: 2,
        type: 'phone',
        value: '1234567890',
      },
    ],
    description: 'The contacts of a person',
  })
  @OneToMany(() => Contact, (contact) => contact.person)
  contacts: Contact[];
}
