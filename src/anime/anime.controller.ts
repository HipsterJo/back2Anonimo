import { Controller,
Post,
Get,
Query,
Param,
Delete,
Body
 } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { getAlldto } from './dto/getAll'
import { AnimeDocument, Anime } from '../schemas/anime.schema';
import {creatAnimedto} from './dto/createAnime'



@Controller('anime')
export class AnimeController {
    constructor(private animeService:AnimeService ){}   

    @Get()
    getAll(
        @Query() query:getAlldto
    ):Promise<AnimeDocument[]>{
        return this.animeService.getAll(query)
    }

    @Post('create')
    createAnime(
        @Body() body:creatAnimedto
    ):Promise<AnimeDocument>{
        return this.animeService.createAnime(body)
    }


}
