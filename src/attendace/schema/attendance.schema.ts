import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Attendance extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseCode: string;

  @Prop({ required: true })
  courseTitle: string;

  @Prop({ required: true })
  time: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
