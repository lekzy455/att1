import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  matricno?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  usertype: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
