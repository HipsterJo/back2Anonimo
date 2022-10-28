import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from './userParams/roles.scheme';
import { raw } from '@nestjs/mongoose';
import { Anime } from './anime.schema';
export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({default: false})
    isVerified: boolean;
    @Prop({required: true, default:["USER"], ref: 'Role'})
    role: string[];
    @Prop({default: now()})
    createdAt: Date;
    @Prop({default: now()})
    updatedAt: Date;
    @Prop(raw(
        {
            "animeId": {type: mongoose.Schema.Types.ObjectId, ref: 'Anime'},
            "episode": Number,
            "time": Number
        }
    ))
   
    history: any[];
    @Prop({required: false, ref: 'Anime'})
    favorites: string[];
    
}

export const UserSchema = SchemaFactory.createForClass(User);