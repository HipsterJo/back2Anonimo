import {HttpException, HttpStatus,  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument, Day } from 'src/schemas/Schedule.schema';
import { DayOfWeek } from 'src/shared/enum/DayOfWeek';
import { CreateNodeDTO } from './dto/CreateNodeDTO';
import { Logger } from '@nestjs/common';
import { Anime, AnimeDocument } from 'src/schemas/anime.schema';





const temp: Record<number, DayOfWeek> = {
    0: DayOfWeek.Sunday,
    1: DayOfWeek.Monday,
    2: DayOfWeek.Tuesday,
    3: DayOfWeek.Wednesday,
    4: DayOfWeek.Thursday,
    5: DayOfWeek.Friday,
    6: DayOfWeek.Saturday,
  };  



@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    constructor(
        @InjectModel(Schedule.name) private scheduleModel:Model<ScheduleDocument>,
        @InjectModel(Anime.name) private animeModel:Model<AnimeDocument>

    ){}

    async createSchedule(){
        try{
            const schedule:Schedule ={
                weekdays:
                    {
                        [DayOfWeek.Monday]:[],
                        [DayOfWeek.Tuesday]:[],
                        [DayOfWeek.Wednesday]:[],
                        [DayOfWeek.Thursday]:[],
                        [DayOfWeek.Friday]:[],
                        [DayOfWeek.Saturday]:[],
                        [DayOfWeek.Sunday]:[]
                    }
                
            }
            //Сохрани в базу данных
            const scheduleDocument = await this.scheduleModel.create(schedule)
            await scheduleDocument.save()
            return scheduleDocument
        }
        catch(e){
            console.log(e)
        }
    }

   

    async addAnime(node:CreateNodeDTO){
        try{
           
            
            const schedule:ScheduleDocument[] = await this.scheduleModel.find()
             //Проверка, что аниме уже есть в расписании
            Object.values(schedule[0].weekdays).forEach((day:Day[])=>{
                day.forEach((item:Day)=>{
                    if(item.AnimeID===node.Anime){
                        throw new HttpException(`Anime ${node.Anime} already in schedule`,HttpStatus.BAD_REQUEST)
                    }
                })
            }
            )
            
            const startdate:Date = new Date(Date.parse(node.StartDatetime))
            const enddate = new Date(Date.parse(node.EndDatetime))
            const day = startdate.getDay()
            const dayOfWeek = temp[day]
            
            console.log(schedule[0].weekdays[dayOfWeek])
            schedule[0].weekdays[dayOfWeek].push({
                AnimeID:node.Anime,
                StartDatetime:startdate,
                EndDatetime:enddate
            })
            await schedule[0].markModified('weekdays')
            await schedule[0].save()
            
            this.logger.log(`Anime ${node.Anime} added to schedule`)


            return schedule[0]
        }
        catch(e){
            console.log(e)
        }
    }

    
    async getAll(date:string):Promise<Anime[]> {
        try{
        const currentDate =  Date.now()
        const targetDate = new Date(Date.parse(date))
        const schedule:ScheduleDocument[] = await this.scheduleModel.find()
        const day = targetDate.getDay()
        const dayOfWeek = temp[day]
        const targetDay = schedule[0].weekdays[dayOfWeek]
        const result:Day[] = targetDay.filter((item:Day)=>{
            const startDate = Date.parse(item.StartDatetime.toString())
            const endDate = Date.parse(item.EndDatetime.toString())
            return startDate<=currentDate && endDate>=currentDate
        })
        const anime:AnimeDocument[] = await this.animeModel.find()
        const animeResult:Anime[] = anime.filter((item:AnimeDocument)=>{
            return result.some((day:Day)=>{
                return day.AnimeID===item._id.toString()
            })
        })
        return animeResult

        }catch(e){
            new HttpException(e.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }




}