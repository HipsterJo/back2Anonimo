import {Controller, Post, Req, Body, UseInterceptors, UploadedFile, Get, Query, Param} from '@nestjs/common';
import { WaifuService } from './waifu.service';
import {CreateWaifuDto} from "./dto";



@Controller('waifu')
export class WaifuController {
    constructor(private waifuService: WaifuService) {        
        
    }

    @Post('create')
    create(@Body() waifuDto: CreateWaifuDto) {
        return this.waifuService.create(waifuDto);
    }

    @Get()
    getAll(){
        return  this.waifuService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.waifuService.getOne(id);
    }

    @Get('anime/:anime')
    getWaifuByAnime(@Param('anime') anime:string){
        return this.waifuService.getWaifuByAnime(anime);
    }

}