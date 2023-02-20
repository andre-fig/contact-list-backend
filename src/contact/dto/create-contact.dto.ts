import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateContactDto {
  @ApiProperty({ example: 1 })
  personId: number;

  @ApiProperty({ example: 'phone' })
  type: string;

  @ApiProperty({ example: '123456789' })
  value: string;
}
