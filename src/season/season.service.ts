import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Season, SeasonDocument } from 'src/schemas/season.schema';
import { CreateSeasonDto } from 'src/season/dto/CreateSeasonDTO';


@Injectable()
export class SeasonService {
    constructor(
        @InjectModel(Season.name) private seasonModel:Model<SeasonDocument>
    ){}

    async getAll():Promise<SeasonDocument[]>{
        try{
            return await this.seasonModel.find()
        }catch(e){
            throw new Error(e)
        }
    }

    async createSeason(body:CreateSeasonDto):Promise<SeasonDocument>{
        try{
            //Проверка на существование жанра
            const genre = await this.seasonModel.findOne({route: body.route})
            if(genre){
                throw new Error('Season already exist')
            }
            //Создание жанра   
            const newGenre = new this.seasonModel(body)
            return await newGenre.save()
        }catch(e){
            throw new Error(e)
        }
    }


    async deleteSeason(id:string):Promise<SeasonDocument>{
        try{
            const genre = await this.seasonModel.findByIdAndDelete(id)
            if(!genre){
                throw new Error('Season not found')
            }
            return genre
        }catch(e){
            throw new Error(e)
        }
    }

}



