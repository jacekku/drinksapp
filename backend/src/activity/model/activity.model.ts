import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityType = 'SEARCH';

@Schema()
export class Activity {
  @Prop()
  userId: string;
  @Prop()
  type: ActivityType;
  @Prop()
  value: string;
}

export type ActivityDocument = Activity & Document;
export const ActivitySchema = SchemaFactory.createForClass(Activity);
