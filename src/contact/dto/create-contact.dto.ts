import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ContactType } from './contact-type.enum';

export class CreateContactDto {
  @ApiProperty({ example: 1 })
  personId: number;

  @ApiProperty({ enum: ContactType, enumName: 'ContactType', example: 'phone' })
  type: ContactType;

  @ApiProperty({ example: '123456789' })
  value: string;
}
