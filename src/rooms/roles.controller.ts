import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { RoomService } from './rooms.service';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ){}

    @Post()
    create(@Body() roomId, animeId) {
        return this.roomService.create(roomId, animeId);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roomService.delete(id);
    }

    @Get()
    getAll() {
        return this.roomService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.roomService.getOne(id);
    }



    
    
}