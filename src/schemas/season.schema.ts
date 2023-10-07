import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';
import {SeasonEnum, SeasonEngEnum} from 'src/shared/enum/Season'

export type SeasonDocument = HydratedDocument<Season>;


@Schema()
export  class Season {
    @Prop()
    year: string;
    //2017

    @Prop()
    season: SeasonEnum;
    //зима

    @Prop()
    seasonEng: SeasonEngEnum;
    //


    @Prop()
    route: string;
    //winter-2017
}

export const SeasonSchema = SchemaFactory.createForClass(Season);