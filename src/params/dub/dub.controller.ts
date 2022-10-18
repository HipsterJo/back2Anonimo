import { Param, Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { DubService } from './dub.service';
import { CreateDubDto } from './dto/create-dub.dto';

@Controller('dub')
export class DubController {
    constructor(private readonly dubService: DubService,

        ) {}

    @Post()
    create(@Body () dto: CreateDubDto) {
        return this.dubService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.dubService.delete(id);
    }

    @Get()
    getAll() {
        return this.dubService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.dubService.getOne(id);
    }
}
