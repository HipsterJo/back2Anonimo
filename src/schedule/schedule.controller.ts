import { Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {CreateNodeDTO} from './dto/CreateNodeDTO'
import { query } from 'express';



@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService:ScheduleService ){
    }   

    @Get()
    getAll(
        @Query('date') date:string
    ){
        return this.scheduleService.getAll(date)
    }

    //Создает пустое расписание
    @Post('create')
    createSchedule(
       
    ){
        return this.scheduleService.createSchedule()
    }

    //Добавляет аниме в расписание
    @Post('add')
    addAnime(
        @Body() node:CreateNodeDTO
    ){
        return this.scheduleService.addAnime(node)
    }




    


}

