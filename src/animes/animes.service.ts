import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/anime-create.dto';
import { GetAnime } from './dto/get-anime.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Anime, AnimeDocument } from 'src/schemes/anime.schema';
import { CountryService } from 'src/params/country/country.service';
import { GenreService } from 'src/params/genre/genre.service';
import { StudioService } from 'src/params/studio/studio.service';
import { DubService } from 'src/params/dub/dub.service';

@Injectable()
export class AnimesService {
    constructor(
        @InjectModel(Anime.name) private animeModel: Model<Anime>,
        private countryService: CountryService,
        private genreService: GenreService,
        private studioService: StudioService,
        private dubService: DubService,
    ) {}

    async create(animeDto: CreateAnimeDto): Promise<Anime> {
        const country = await this.countryService.getIdByParam(animeDto.country);
        console.log("Страна",country);
        const genre = await this.genreService.getIdByParam(animeDto.genre);
        console.log("Жанры",genre);
        const studio = await this.studioService.getIdByParam(animeDto.studio);
        console.log("Студия",studio);
        const dubs = await this.dubService.getIdByParam(animeDto.dubs);
        console.log("Озвучка",dubs);

        try{
            const anime = await this.animeModel.create({...animeDto, country, genre, studio, dubs});
            console.log(anime);
            return anime;
        }
        catch(e){
            console.log(e);
            throw new HttpException('Ошибка при создании Аниме', HttpStatus.NOT_FOUND);
        }
        
        
    }
    
    async getAll(filterDto:GetAnime):Promise<Anime[]>{
        const {sort, type, genres, status, limit, search, page} = filterDto;
        
        const idGenres = await this.genreService.getIdByParam(genres); 
        let query: Anime[]

        if (sort){
            if (sort === 'views'){
             query= await this.animeModel.find().sort({views: -1}).exec();
            }
            if (sort === 'rating'){
                 query = await this.animeModel.find().sort({rating: -1}).exec();
            }
            if(sort === 'title'){
                 query = await this.animeModel.find().sort({title: -1}).exec();
            }
            if (sort === 'createdAt'){
                 query = await this.animeModel.find().sort({createdAt: -1}).exec();
            }
        }
        else{
             query = await this.animeModel.find().exec();
        }


        if (status){
            query = query.filter(anime => anime.status === status);
        }

        if (type){
            query = query.filter(anime => anime.type === type);
        }
        
        if (idGenres){
            for (let i = 0; i < idGenres.length; i++) {
                query = query.filter(anime => anime.genre.includes(idGenres[i]));
            }
        }

        if (search){
            console.log(search)
            query = query.filter(anime => anime.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (limit){
            query = query.slice(0, limit);
        }

        if (page){
            query = query.slice(page*10, page*10+10);
        }
        
        return query;      

    }

    async getOne(id: string): Promise<Anime>{
        const anime = await this.animeModel.findById(id);
        return anime;
    }
    

}
