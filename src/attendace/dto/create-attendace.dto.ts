// sign-attendance.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignAttendanceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  courseTitle: string;
}
