import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DubDocument = Dub & Document;

@Schema()
export class Dub {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    param: string;
}

export const DubSchema = SchemaFactory.createForClass(Dub);