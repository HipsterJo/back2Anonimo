import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GenreService } from './genre.service';
import {CreateGenreDto} from './dto/CreateGenreDTO'


@Controller('genre')
export class GenreController {
    constructor(private genreService:GenreService ){
    }   

    @Get()
    getAll(){
        return this.genreService.getAll()
    }

    @Post('create')
    createGenre(
        @Body() body:CreateGenreDto
    ){
        return this.genreService.createGenre(body)
    }

    @Delete('delete/:id')
    deleteGenre(
        @Param('route') route:string
    ){
        return this.genreService.deleteGenre(route)
    }


}
