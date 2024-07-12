// create-qrcode.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQRCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  courseTitle: string;
}
