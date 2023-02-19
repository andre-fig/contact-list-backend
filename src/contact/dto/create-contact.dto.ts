import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ContactType } from './contact-type.enum';

export class CreateContactDto {
  @ApiProperty()
  personId: number;

  @ApiProperty()
  type: ContactType;

  @ApiProperty()
  value: string;
}
