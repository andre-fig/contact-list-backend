import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { Person } from './entities/person.entity';
import { Contact } from 'src/contact/entities/contact.entity';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiCreatedResponse({
    description: 'The person has been successfully created',
    type: Person,
  })
  @ApiBadRequestResponse({ description: 'Name is required' })
  async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    if (!createPersonDto.name) {
      throw new BadRequestException('Name is required');
    }
    return await this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all people' })
  @ApiOkResponse({
    description: 'The persons have been successfully retrieved',
    type: [Person],
  })
  @ApiNotFoundResponse({ description: 'No person found' })
  async findAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a person by id' })
  @ApiOkResponse({
    description: 'The person has been successfully retrieved',
    type: Person,
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  async findOne(@Param('id') id: number): Promise<Person> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.personService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a person by id' })
  @ApiOkResponse({
    description: 'The person has been successfully updated',
    type: Person,
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  async update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person and contacts by id' })
  @ApiOkResponse({
    description: 'The person has been successfully deleted',
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  async remove(@Param('id') id: number): Promise<string> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.personService.remove(+id);
  }

  @Get(':id/contact')
  @ApiOperation({ summary: 'Get all contacts by personId' })
  @ApiOkResponse({
    description: 'The contacts have been successfully retrieved',
    type: [Contact],
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person or contact not found' })
  async findContacts(@Param('id') id: number): Promise<Contact[]> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.personService.findContacts(+id);
  }

  @Delete(':id/contact')
  @ApiOperation({ summary: 'Delete all contacts by personId' })
  @ApiOkResponse({
    description: 'The contacts have been successfully deleted',
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  async removeContacts(@Param('id') id: number): Promise<string> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.personService.removeContacts(+id);
  }
}
