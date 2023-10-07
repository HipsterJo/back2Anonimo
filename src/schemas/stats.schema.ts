import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';


export type StatsDocument = HydratedDocument<Stats>;

@Schema()
export class Stats{

    constructor(
    ){
        this.averageScore = 0,
        this.raitingCount = 0,
        this.trackedCount = 0
    }


    @Prop()
    //Средняя оценка
    averageScore: number;

    @Prop()
    //Сколько людей поставило оценку
    raitingCount: number;

    @Prop()
    //Сколько людей добавило в списки
    trackedCount: number;

}

export const StatsSchema = SchemaFactory.createForClass(Stats);