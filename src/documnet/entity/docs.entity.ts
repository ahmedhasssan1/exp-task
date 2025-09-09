import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResearchDocument = Research & Document;

@Schema()
export class Research {
  @Prop({ required: true })
  projectId: number ;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ResearchSchema = SchemaFactory.createForClass(Research);
