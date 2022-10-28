import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAnimeDto } from "./dto/anime-create.dto";
import { GetAnime } from "./dto/get-anime.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Anime, AnimeDocument } from "src/schemes/anime.schema";
import { CountryService } from "src/params/country/country.service";
import { GenreService } from "src/params/genre/genre.service";
import { StudioService } from "src/params/studio/studio.service";
import { DubService } from "src/params/dub/dub.service";
import {property, returnFirstLoadType, filterRecentlyUpdated, returnUpdateProperty} from "./types";


@Injectable()
export class AnimesService {
  constructor(
    @InjectModel(Anime.name) private animeModel: Model<Anime>,
    private countryService: CountryService,
    private genreService: GenreService,
    private studioService: StudioService,
    private dubService: DubService
  ) {}

  async create(animeDto: CreateAnimeDto): Promise<Anime> {
    try {
        const titleAnime = animeDto.title;
        if(await this.animeModel.findOne({title: titleAnime})) {
            throw new HttpException('Anime already exists', HttpStatus.BAD_REQUEST);
        }

      const country = await this.countryService.getIdByParam(animeDto.country);
      const genre = await this.genreService.getIdByParam(animeDto.genre);
      const studio = await this.studioService.getIdByParam(animeDto.studio);
      const dubs = await this.dubService.getIdByParam(animeDto.dubs);
      const {
        title,
        type,
        description,
        rating,
        image,
        imageHuge,
        episodes,
        year,
        duration,
        views,
        status,
        subs
      } = animeDto;
      const anime = await this.animeModel.create({
        title,
        type,
        description,
        rating,
        image,
        imageHuge,
        episodes,
        year,
        duration,
        views,
        country,
        genre,
        studio,
        dubs,
        status,
        subs
        
      });
      return anime;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        "Ошибка при создании Аниме",
        HttpStatus.NOT_FOUND
      );
    }
    
  }

  async getAll(filterDto: GetAnime): Promise<Anime[]> {
    let { sort, type, genres, status, limit, search, page, period } =
      filterDto;
    if (!page) {
      page =0 
    }
    const idGenres = await this.genreService.getIdByParam(genres);
    let query: Anime[];

    if (sort) {
      query = await this.animeModel.find().sort(sort).exec();
    }
    if (type) {
      query = query.filter((anime) => anime.type === type);
    }
    if (idGenres) {
      for (let i = 0; i < idGenres.length; i++) {
        query = query.filter((anime) => anime.genre.includes(idGenres[i]));
      }
    }
    if (status) {
      query = query.filter((anime) => anime.status === status);
    }
    if (search) {
      query = query.filter((anime) =>
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (period) {
      if (period === "today") {
        query = query.filter(
          (anime) =>
            anime.updatedAt >= new Date(new Date().setHours(0, 0, 0, 0))
        );
      }
      if (period === "week") {
        query = query.filter(
          (anime) =>
            anime.updatedAt >=
            new Date(new Date().setDate(new Date().getDate() - 7))
        );
      }
      if (period === "month") {
        query = query.filter(
          (anime) =>
            anime.updatedAt >=
            new Date(new Date().setMonth(new Date().getMonth() - 1))
        );
      }
      if (period === "year") {
        query = query.filter(
          (anime) =>
            anime.updatedAt >=
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        );
      }
    }

    
    if (page) {
      query = query.slice(page * limit, page * limit + limit);
    }
    
    return query;
  }

  async getOne(id: string): Promise<Anime> {
    const anime = await this.animeModel.findById(id);
    return anime;
  }



  async getFirstLoad(): Promise<returnFirstLoadType> {
    const cards = await this.animeModel.find().sort("-views").limit(15).exec();
    const {cards: topAnime} = await this.findByPeriod({
      label: "topAnime",
      period: "today",
      value: "rating",
    })
    const {cards: recentlyAdded } = await this.findByPeriod({
      label: "recentlyAdded",
      period: "today",
      value: "createdAt",
    })
    
    const {cards: resentlyCompleted} = await this.findByPeriod({
      label: "resentlyCompleted",
      period: "today",
      value: "completed",
    })

    const {cards: recentlyUpdated} = await this.getRecentlyUpdated({filter: "all"} as filterRecentlyUpdated);

    return {
      cards,
      topAnime,
      recentlyUpdated,
      recentlyAdded,
      resentlyCompleted,
    };
  }

  async findByPeriod(property:property): Promise<returnUpdateProperty> {
    const { label, period, value} = property;
    let cards:Anime[];
    if (period === "today") {
      cards = await (await this.animeModel.find().sort("-" + value)).filter(anime => anime.updatedAt >= new Date(new Date().setHours(0, 0, 0, 0))).splice(0, 9)
    }
    if (period === "week") {
      cards = await (await this.animeModel.find().sort("-" + value)).filter(anime => anime.updatedAt >= new Date(new Date().setDate(new Date().getDate() - 7))).splice(0, 9)
    }
    if (period === "month") {
      
      cards = (await this.animeModel.find().sort( "-" + value)).filter(anime => anime.updatedAt >= new Date(new Date().setMonth(new Date().getMonth() - 1))).splice(0, 9)
      
    }
    console.log(label, cards)
    return {
      label,
      cards
    }

  }

  async getRecentlyUpdated(query: filterRecentlyUpdated): Promise<returnUpdateProperty> {
    const {filter} = query;
    const name= "recentlyUpdated"
    const value= "updatedAt"
    let cards:Anime[];
    if (filter == "all"){
      cards = await this.animeModel.find().sort("-" + value).limit(15).exec();
    }
    if (filter == "subbed") {
      cards = await this.animeModel.find({subs: true}).sort("-" + value).limit(15).exec();
    }
    if (filter == "dubbed") {
      cards = await this.animeModel.where("dubs").ne(null).sort("-" + value).limit(15).exec();
    }
    return {
      label: name,
      cards
    }
  }


}
