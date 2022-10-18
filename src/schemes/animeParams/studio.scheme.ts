import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudioDocument = Studio & Document;

@Schema()
export class Studio {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    param: string;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);