import { Injectable } from '@nestjs/common';
import { SignAttendanceDto } from './dto/create-attendace.dto';
import { CreateQRCodeDto } from './dto/create-qr.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './schema/attendance.schema';

@Injectable()
export class AttendaceService {
  constructor(
    @InjectModel('Attendance') private attendanceModel: Model<Attendance>,
  ) {}
  async createQRCode(createQRCodeDto: CreateQRCodeDto) {
    const { courseCode, courseTitle } = createQRCodeDto;
    return createQRCodeDto;
  }

  async signAttendance(
    userId: string,
    signAttendanceDto: SignAttendanceDto,
  ): Promise<string> {
    const { courseCode, courseTitle } = signAttendanceDto;

    // Check Bluetooth connection (mocked for now)
    const isBluetoothConnected = await this.checkBluetoothConnection(userId);
    if (!isBluetoothConnected) {
      return 'Cannot sign attendance at the moment';
    }

    const newAttendance = new this.attendanceModel({
      userId,
      courseCode,
      courseTitle,
      time: Date.now(),
    });

    await newAttendance.save();
    return 'Attendance signed successfully';
  }

  async getAttendanceByCourse(
    courseCode: string,
    startDate?: string,
    endDate?: string,
  ) {
    const query: any = { courseCode };

    if (startDate) {
      query.time = { $gte: new Date(startDate) };
    }

    if (endDate) {
      query.time = query.time || {};
      query.time.$lte = new Date(endDate);
    }

    return this.attendanceModel.find(query).exec();
  }

  private async checkBluetoothConnection(userId: string): Promise<boolean> {
    // Mock Bluetooth connection check (replace with actual implementation)
    return true;
  }
}
