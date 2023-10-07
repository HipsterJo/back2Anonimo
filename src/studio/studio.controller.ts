import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { StudioService } from './studio.service';
import {CreateStudioDto} from './dto/CreateStudioDTO'


@Controller('studio')
export class StudioController {
    constructor(private studioService:StudioService ){
    }   

    @Get()
    getAll(){
        return this.studioService.getAll()
    }

    @Post('create')
    createGenre(
        @Body() body:CreateStudioDto
    ){
        return this.studioService.createStudio(body)
    }

    @Delete('delete/:id')
    deleteGenre(
        @Param('route') route:string
    ){
        return this.studioService.deleteStudio(route)
    }


}
