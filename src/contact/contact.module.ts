import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Person])],
  controllers: [ContactController],
  providers: [ContactService, PersonService],
})
export class ContactModule {}
