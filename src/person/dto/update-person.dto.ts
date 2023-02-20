import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '2021-01-01' })
  birthDate: Date;
}
