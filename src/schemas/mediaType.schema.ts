import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';

export type MediaTypeDocument = HydratedDocument<MediaType>;


@Schema()
export  class MediaType {
    @Prop()
    name: string;

    @Prop()
    route: string;
    
}

export const MediaTypeSchema = SchemaFactory.createForClass(MediaType);