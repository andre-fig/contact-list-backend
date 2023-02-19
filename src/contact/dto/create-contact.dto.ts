import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateContactDto {
  @ApiProperty()
  personId: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  value: string;
}
