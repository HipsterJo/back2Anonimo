import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';


@Controller('genre')
export class GenreController {
    constructor(
        private readonly genreService: GenreService,
    ){}

    @Post()
    create(@Body() dto: CreateGenreDto) {
        return this.genreService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.genreService.delete(id);
    }

    @Get()
    getAll() {
        return this.genreService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.genreService.getOne(id);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() dto: CreateGenreDto) {
        return this.genreService.update(id, dto);
    }

    
    
}
