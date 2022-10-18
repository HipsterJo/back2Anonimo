import {Controller, Post, Req, Body, UseInterceptors, UploadedFile, Get, Query, Param} from '@nestjs/common';
import { AnimesService } from './animes.service';
import {CreateAnimeDto} from "./dto/anime-create.dto";
import { GetAnime } from './dto/get-anime.dto'


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

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.animesService.getOne(id);
    }

}
