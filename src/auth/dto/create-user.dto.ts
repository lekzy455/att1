import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  firstname: string;

  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@jhsfh.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The matric number of the student',
    example: '123456777',
  })
  @IsOptional()
  matricno?: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'securePassword123',
  })
  password: string;


  @IsString()
  @ApiProperty({
    description: '',
    example: 'student',
  })
  usertype: string;

}
