import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as mongoose from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({timestamps: true})
export class Room {
    @Prop({required: true, unique: true})
    roomId: string;
    @Prop({required: true, type: String, ref: 'Anime'})
    animeId: string;
    @Prop({default: now()})
    createdAt: Date;
    @Prop({default: now()})
    updatedAt: Date;
}