import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;


@Schema()
export  class Genre {
    @Prop()
    name: string;

    @Prop() 
    nameEng: string;

    @Prop()
    route: string;  
}

export const GenreSchema = SchemaFactory.createForClass(Genre);