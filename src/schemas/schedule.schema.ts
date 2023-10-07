import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';
import { Anime } from './anime.schema';
import { DayOfWeek } from 'src/shared/enum/DayOfWeek';


export type ScheduleDocument = Schedule & mongoose.Document;



  

export interface Day{
    AnimeID:string
    StartDatetime:Date
    EndDatetime:Date

}

@Schema()
export class Schedule{
    @Prop({ type: Object })
    weekdays: Record<DayOfWeek, Day[]>;
}
    

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)