import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId  } from 'mongoose';
import { Genre, GenreDocument } from '../../schemes/animeParams/genre.scheme';
import { CreateGenreDto } from './dto/create-genre.dto';



@Injectable()
export class GenreService {
    constructor(
        @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    ) {}

    async create(dto: CreateGenreDto) {
        const genre = await this.genreModel.create(dto);
        return genre;
    }

    async getAll() {
        const genres = await this.genreModel.find().exec();
        return genres;
    }

    async getOne(id: string) {
        const genre = await this.genreModel.findById(id).exec();
        return genre;
    }

    async delete(id: string) {
        const genre = await this.genreModel.findByIdAndDelete(id).exec();
        return genre;
    }

    async update(id: string, dto: CreateGenreDto) {
        const genre = await this.genreModel.findByIdAndUpdate(id, dto, {new: true}).exec();
        return genre;
    }

    async getIdByParam(params: string[]) {
        const genres: GenreDocument[] = await this.genreModel.find({param: {$in: params}}).exec();
        const genresId = genres.map(genre => genre._id);
        if(!genresId){
            throw new HttpException('Жанры не найдены', HttpStatus.NOT_FOUND);
        }
        console.log(genresId)
        return genresId;
    }
     

    
}
