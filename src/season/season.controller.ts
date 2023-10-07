import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { SeasonService } from './season.service';
import {CreateSeasonDto} from './dto/CreateSeasonDTO'


@Controller('season')
export class SeasonController {
    constructor(private seasonService:SeasonService ){
    }   

    @Get()
    getAll(){
        return this.seasonService.getAll()
    }

    @Post('create')
    createSeason(
        @Body() body:CreateSeasonDto
    ){
        return this.seasonService.createSeason(body)
    }

    @Delete('delete/:id')
    deleteSeason(
        @Param('route') route:string
    ){
        return this.seasonService.deleteSeason(route)
    }


}
