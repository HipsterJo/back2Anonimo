import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';

export type StudioDocument = HydratedDocument<Studio>;


@Schema()
export  class Studio {
    @Prop()
    name: string;

    @Prop()
    route: string;
    
}


export const StudioSchema = SchemaFactory.createForClass(Studio);