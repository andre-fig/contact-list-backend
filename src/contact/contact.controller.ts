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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger/dist';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import {
  ApiBadRequestResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiCreatedResponse({
    description: 'The contact has been successfully created',
    type: Contact,
  })
  @ApiBadRequestResponse({
    description: 'Type, value and personId are required',
  })
  @ApiNotAcceptableResponse({
    description: 'The personId does not exist',
  })
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    const { type, value, personId } = createContactDto;

    if (!type || !value || !personId) {
      throw new BadRequestException('Type, value and personId are required');
    }

    return await this.contactService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiOkResponse({
    description: 'The contacts have been successfully retrieved',
    type: [Contact],
  })
  @ApiBadRequestResponse({ description: 'No contact found' })
  async findAll(): Promise<Contact[]> {
    return await this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by id' })
  @ApiOkResponse({
    description: 'The contact has been successfully retrieved',
    type: Contact,
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async findOne(@Param('id') id: number): Promise<Contact> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.contactService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact by id' })
  @ApiOkResponse({
    description: 'The contact has been successfully updated',
    type: Contact,
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact by id' })
  @ApiOkResponse({
    description: 'The contact has been successfully deleted',
    type: Contact,
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async remove(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.contactService.remove(+id);
  }

  @Get('/person/:id')
  @ApiOperation({ summary: 'Get all contacts by personId' })
  @ApiOkResponse({
    description: 'The contacts have been successfully retrieved',
    type: [Contact],
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person or contact not found' })
  async findByPersonId(@Param('id') id: number): Promise<Contact[]> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.contactService.findByPersonId(+id);
  }

  @Delete('/person/:id')
  @ApiOperation({ summary: 'Delete all contacts by personId' })
  @ApiOkResponse({
    description: 'The contacts have been successfully deleted',
    type: [Contact],
  })
  @ApiBadRequestResponse({ description: 'Id is required' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  async removeByPersonId(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    return await this.contactService.removeByPersonId(+id);
  }
}
