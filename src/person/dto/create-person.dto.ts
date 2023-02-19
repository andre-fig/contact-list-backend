import { ApiProperty } from '@nestjs/swagger/dist';

export class CreatePersonDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;
}
