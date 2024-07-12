import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { SignAttendanceDto } from './dto/create-attendace.dto';
import { CreateQRCodeDto } from './dto/create-qr.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('attendace')
@Controller('attendace')
export class AttendaceController {
  constructor(private readonly attendaceService: AttendaceService) {}

  @Post('create-qrcode')
  async createQRCode(@Body() createQRCodeDto: CreateQRCodeDto) {
    return this.attendaceService.createQRCode(createQRCodeDto);
  }

  @Post('sign-attendance')
  async signAttendance(@Body() signAttendanceDto: SignAttendanceDto) {
    const userId = signAttendanceDto.userId;
    return this.attendaceService.signAttendance(userId, signAttendanceDto);
  }

  @Get('course/:courseCode')
  async getAttendanceByCourse(
    @Param('courseCode') courseCode: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.attendaceService.getAttendanceByCourse(
      courseCode,
      startDate,
      endDate,
    );
  }
}
