import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Studio, StudioDocument } from 'src/schemas/Studio.schema';
import { CreateStudioDto } from 'src/Studio/dto/CreateStudioDTO';


@Injectable()
export class StudioService {
    constructor(
        @InjectModel(Studio.name) private StudioModel:Model<StudioDocument>
    ){}

    async getAll():Promise<StudioDocument[]>{
        try{
            return await this.StudioModel.find()
        }catch(e){
            throw new Error(e)
        }
    }

    async createStudio(body:CreateStudioDto):Promise<StudioDocument>{
        try{
            //Проверка на существование жанра
            const studio = await this.StudioModel.findOne({name:body.name})
            if(Studio){
                throw new Error('Studio already exist')
            }
            //Создание жанра   
            const newStudio = new this.StudioModel(body)
            return await newStudio.save()
        }catch(e){
            throw new Error(e)
        }
    }


    async deleteStudio(id:string):Promise<StudioDocument>{
        try{
            const Studio = await this.StudioModel.findByIdAndDelete(id)
            if(!Studio){
                throw new Error('Studio not found')
            }
            return Studio
        }catch(e){
            throw new Error(e)
        }
    }

}



