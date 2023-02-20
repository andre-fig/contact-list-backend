import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ example: 'john.doe@example.com' })
  value: string;

  @ApiProperty({ example: 'email' })
  type: string;
}
