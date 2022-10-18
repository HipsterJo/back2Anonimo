import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { Dub } from './animeParams/dub.scheme';
import { Genre } from './animeParams/genre.scheme';
import { Studio } from './animeParams/studio.scheme';
import { Country } from './animeParams/country.scheme';
import * as mongoose from 'mongoose';


export type AnimeDocument = Anime & Document;

@Schema({timestamps: true})
export class Anime {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    description: string;
    @Prop({ required: true })
    image: string;
    @Prop({ required: true })
    imageHuge: string;
    @Prop({ required: true })
    episodes: number;
    @Prop({ required: true })
    rating: number;
    @Prop({ required: true })
    year: number; 
    @Prop({ required: true })
    duration: number;
    @Prop({ required: true })
    subs: boolean;
    @Prop({ required: true })
    views: number;
    @Prop({ required: true })
    status: 'ongoing' | 'completed';
    @Prop({ required: true })
    type: 'movie' | 'tv' | 'ova' | 'ona' | 'special';
    @Prop({default: now()})
    createdAt: Date;
    @Prop({default: now()})
    updatedAt: Date;

    @Prop({ required: true , type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
    country: Country;
    @Prop({ required: true , type: [mongoose.Schema.Types.ObjectId], ref: 'Dub' })
    dubs: Dub[];
    @Prop({ required: true , type: mongoose.Schema.Types.ObjectId, ref: 'Studio' })
    studio: Studio;
    @Prop({ required: true , type: [mongoose.Schema.Types.ObjectId], ref: 'Genre' })
    genre:Genre[];
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);