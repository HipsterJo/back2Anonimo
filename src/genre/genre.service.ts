import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from 'src/schemas/genre.schema';
import { CreateGenreDto } from 'src/genre/dto/CreateGenreDTO';


@Injectable()
export class GenreService {
    constructor(
        @InjectModel(Genre.name) private genreModel:Model<GenreDocument>
    ){}

    async getAll():Promise<GenreDocument[]>{
        try{
            return await this.genreModel.find()
        }catch(e){
            throw new Error(e)
        }
    }

    async createGenre(body:CreateGenreDto):Promise<GenreDocument>{
        try{
            //Проверка на существование жанра
            const genre = await this.genreModel.findOne({name:body.name})
            if(genre){
                throw new Error('Genre already exist')
            }
            //Создание жанра   
            const newGenre = new this.genreModel(body)
            return await newGenre.save()
        }catch(e){
            throw new Error(e)
        }
    }


    async deleteGenre(id:string):Promise<GenreDocument>{
        try{
            const genre = await this.genreModel.findByIdAndDelete(id)
            if(!genre){
                throw new Error('Genre not found')
            }
            return genre
        }catch(e){
            throw new Error(e)
        }
    }

}



