import {Controller, Post, Req, Body, UseInterceptors, UploadedFile, Get, Query, Param} from '@nestjs/common';
import { AnimesService } from './animes.service';
import {CreateAnimeDto} from "./dto/anime-create.dto";
import { GetAnime } from './dto/get-anime.dto'
import { property , filterRecentlyUpdated} from './types';


@Controller('animes')
export class AnimesController {
    constructor(private animesService: AnimesService) {}

    @Post('create')
    create(@Body() animeDto: CreateAnimeDto) {
        return this.animesService.create(animeDto);
    }

    @Get()
    getAll(@Query() filterDto:GetAnime){
        return  this.animesService.getAll(filterDto);
    }

    @Get('firstLoad')
    getFirstLoad(){
        return this.animesService.getFirstLoad();
    }

    @Get("updateProperty")
    findByPeriod(@Query() query:property){
        return this.animesService.findByPeriod(query);
    }

    @Get("recentlyUpdated")
    getRecentlyUpdated(@Query() query:filterRecentlyUpdated){
        
        return this.animesService.getRecentlyUpdated(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.animesService.getOne(id);
    }


    

}
