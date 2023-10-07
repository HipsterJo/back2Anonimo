import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';
import { Season } from './season.schema';
import { Stats } from './stats.schema';
import { Relations } from './relations.schema';
import { Genre } from './genre.schema';
import { Studio } from './studio.schema';
import { MediaType } from './mediaType.schema';
import {Status} from '../shared/enum/Status'


export type AnimeDocument = HydratedDocument<Anime>;




@Schema()
export  class Anime {
    @Prop()
    title: string;

    @Prop()
    titleEng: string;

    @Prop()
    titleJap: string;

    @Prop()
    month: string;

    @Prop()
    year: number;

    @Prop({refPath: 'Season'})
    season:Season;

    @Prop()
    genres: [{type: Genre , refPath: 'Genre'}];

    @Prop()
    studios: [{type: Studio, refPath: 'Studio'}];

    @Prop()
    mediaTypes: [{type: MediaType, refPath: 'MediaType'}];

    @Prop()
    episodes: number;

    @Prop()
    status: Status;

    @Prop()
    imageVersionRoute: string;

    @Prop()
    stats: [{type: Stats, refPath: 'Stats'}];

    @Prop()
    relations?: [{type: Relations, refPath: 'Relations'}];

    
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);













