import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RoleDocument = History & Document;

@Schema()
export class History {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Anime'})
    animeId: string;
    @Prop({required: true, type: Number})
    episode: number;
    @Prop({required: true, type: Number})
    time: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);