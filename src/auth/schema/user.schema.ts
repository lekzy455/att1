import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);
