import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const newPerson = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(newPerson);
  }

  async findAll(): Promise<Person[]> {
    const people = await this.personRepository.find();
    if (!people) {
      throw new NotFoundException('No person found');
    }
    return people;
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return await this.personRepository.save({
      id,
      ...updatePersonDto,
    });
  }

  async remove(id: number): Promise<string> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    await this.personRepository.remove(person);

    return 'Person deleted';
  }
}
