import { Body, Param, Controller, Get, Post, Delete } from '@nestjs/common';
import { StudioService } from './studio.service';
import { CreateStudioDto } from './dto/create-studio.dto';


@Controller('studio')
export class StudioController {
    constructor(private readonly studioService: StudioService,

        ) {}

    @Post()
    create(@Body () dto: CreateStudioDto) {
        return this.studioService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.studioService.delete(id);
    }

    @Get()
    getAll() {
        return this.studioService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.studioService.getOne(id);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() dto: CreateStudioDto) {
        return this.studioService.update(id, dto);
    }
    

}
