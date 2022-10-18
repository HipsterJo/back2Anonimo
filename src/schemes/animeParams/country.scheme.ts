import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    param: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);