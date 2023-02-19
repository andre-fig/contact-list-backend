import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @Inject(forwardRef(() => PersonService))
    private readonly personService: PersonService,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const { type, value, personId } = createContactDto;

    const person = await this.personService.findOne(personId);

    const newContact = this.contactRepository.create({
      type,
      value,
      person,
    });

    return await this.contactRepository.save(newContact);
  }

  async findAll(): Promise<Contact[]> {
    const contacts = await this.contactRepository.find({
      relations: ['person'],
    });

    if (!contacts) {
      throw new NotFoundException('No contact found');
    }

    return contacts;
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const { type, value } = updateContactDto;

    await this.findOne(id);

    return this.contactRepository.save({
      id,
      type,
      value,
    });
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);

    await this.contactRepository.delete(id);

    return 'Contact deleted';
  }

  async removeByPersonId(personId: number): Promise<string> {
    await this.personService.findOne(personId);

    await this.contactRepository.find({
      where: { person: { id: personId } },
    });

    await this.contactRepository.delete({ person: { id: personId } });

    return 'Contacts deleted';
  }

  async findByPersonId(personId: number): Promise<Contact[]> {
    await this.personService.findOne(personId);

    const contacts = await this.contactRepository.find({
      where: { person: { id: personId } },
    });

    if (!contacts) {
      throw new NotFoundException('No contact found');
    }

    return contacts;
  }
}
