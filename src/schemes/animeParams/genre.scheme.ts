import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    param: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);