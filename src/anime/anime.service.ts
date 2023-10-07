import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Anime, AnimeDocument} from "../schemas/anime.schema"
import {getAlldto} from "./dto/getAll"
import {Stats, StatsDocument} from "../schemas/stats.schema"
import {creatAnimedto} from "src/anime/dto/createAnime"
import { Genre, GenreDocument } from 'src/schemas/genre.schema';
import { Studio, StudioDocument } from 'src/schemas/studio.schema';
import { MediaType, MediaTypeDocument } from 'src/schemas/mediaType.schema';
import { Season, SeasonDocument } from 'src/schemas/season.schema';
import { Status } from 'src/shared/enum/Status';



@Injectable()
export class AnimeService {
    constructor(
        @InjectModel(Anime.name) private animeModel:Model<AnimeDocument>,
        @InjectModel(Stats.name) private statsModel:Model<Stats>,
        @InjectModel(Genre.name) private genreModel:Model<GenreDocument>,
        @InjectModel(Studio.name) private studioModel:Model<StudioDocument>,
        @InjectModel(MediaType.name) private mediaTypeModel:Model<MediaTypeDocument>,
        @InjectModel(Season.name) private seasonModel:Model<SeasonDocument>,
       

        
    ){}

    async getAll(
        getAllDto:getAlldto
    ):Promise<AnimeDocument[]>{
        try{
            const {offset,limit,sort,genres,genreExclude,studios,studiosExclude,mediaTypes,mediaTypesExclude,year,yearExclude,season,seasonExclude,status} = getAllDto
            const query = this.animeModel.find()
            
            //Фильтруем по жанрам
            if(genres){
                query.where('genres').all(genres)
            }
            if(genreExclude){
                query.where('genres').nin(genreExclude)
            }

            //Фильтруем по студиям
            if(studios){
                query.where('studios').all(studios)
            }
            if(studiosExclude){
                query.where('studios').nin(studiosExclude)
            }

            //Фильтруем по типам медиа
            if(mediaTypes){
                query.where('mediaType').all(mediaTypes)
            }
            if(mediaTypesExclude){
                query.where('mediaType').nin(mediaTypesExclude)
            }

            //Фильтруем по годам
            if(year){
                query.where('year').all(year)
            }
            if(yearExclude){
                query.where('year').nin(yearExclude)
            }

            //Фильтруем по сезонам
            if(season){
                query.where('season').all(season)
            }
            if(seasonExclude){
                query.where('season').nin(seasonExclude)
            }

            //Фильтруем по статусам
            if(status){
                query.where('status').all(status)
            }

            //Сортируем
            if(sort){
                query.sort(sort)
            }

            //Пагинация
            if(offset){
                query.skip(offset)
            }
            if(limit){
                query.limit(limit)
            }

            const result = await query.exec()
            return result
        }catch(e){
            throw new HttpException(e.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createAnime(
        dto:creatAnimedto
    ):Promise<AnimeDocument>{
        try{
            this.validation(dto)
            const anime = {...dto, stats: new Stats()}
            const newAnime = new this.animeModel(anime)
            const result = await newAnime.save()
            return result
        }catch(e){
            throw new HttpException(e.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //Валидация данных при создании аниме
    async  validation (dto:creatAnimedto){
        //Проверка на то, что жанры есть в бд
        const genresQuery:Genre[] = dto.genres
        const genres:GenreDocument[] = await this.genreModel.find()
        genresQuery.forEach((genre)=>{
            if(!genres.some((genreInDb)=>genreInDb.route===genre.route)){
                throw new HttpException(`Genre ${genre} not found`,HttpStatus.BAD_REQUEST)
            }
        })

        //Проверка на то, что студии есть в бд
        const studiosQuery:Studio[] = dto.studios
        const studios:StudioDocument[] = await this.studioModel.find()
        studiosQuery.forEach((studio)=>{
            if(!studios.some((studioInDb)=>studioInDb.route===studio.route)){
                throw new HttpException(`Studio ${studio} not found`,HttpStatus.BAD_REQUEST)
            }
        })

        //Проверка на то, что тип медиа есть в бд
        const mediaTypeQuery:MediaType = dto.mediaType
        const mediaTypes:MediaTypeDocument[] = await this.mediaTypeModel.find()
        if(!mediaTypes.some((mediaType)=>mediaType.route===mediaTypeQuery.route)){
            throw new HttpException(`Media type ${mediaTypeQuery} not found`,HttpStatus.BAD_REQUEST)
        }

        //Проверка на то, что сезон есть в бд, если нет, то создаем его
        const seasonQuery:Season = dto.season
        const season:SeasonDocument[] = await this.seasonModel.find()
        if(!season.some((season)=>season.route===seasonQuery.route)){
            const newSeason = new this.seasonModel(seasonQuery)
            await newSeason.save()
        }

        //Проверка на то, что статус есть в бд
        const statusQuery:Status = dto.status
        if(!Object.values(Status).includes(statusQuery)){
            throw new HttpException(`Status ${statusQuery} not found`,HttpStatus.BAD_REQUEST)
        }
    }
}

            
