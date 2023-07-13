import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as mongoose from 'mongoose';
import { Anime } from './anime.schema';

export type WaifuDocument = Waifu & Document;

@Schema({timestamps: true})
export class Waifu {
    @Prop({required: true, unique: true})
    name: string;
    @Prop({required: true})
    image: string[];
    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Anime'})
    anime: Anime;
    @Prop({required: true})
    inFavorites:number
    @Prop({required: false})
    createdAt: Date;
    @Prop({required: false})
    updatedAt: Date;
}

export const WaifuSchema = SchemaFactory.createForClass(Waifu);