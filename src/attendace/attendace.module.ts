import { Module } from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { AttendaceController } from './attendace.controller';
import { AttendanceSchema } from './schema/attendance.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attendance', schema: AttendanceSchema },
    ]),
  ],
  controllers: [AttendaceController],
  providers: [AttendaceService],
})
export class AttendaceModule {}
