import { ApiProperty } from '@nestjs/swagger/dist';

export class CreatePersonDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '2021-01-01' })
  birthDate: Date;
}
