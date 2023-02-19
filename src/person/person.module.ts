import { forwardRef, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from '../contact/contact.module';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../contact/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Contact]),
    forwardRef(() => ContactModule),
  ],
  controllers: [PersonController],
  providers: [PersonService, ContactService],
})
export class PersonModule {}
