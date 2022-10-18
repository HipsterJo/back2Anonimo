import { Body, Param,Controller, Get, Post, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService,

        ) {}

    @Post()
    create(@Body () dto: CreateCountryDto) {
        return this.countryService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.countryService.delete(id);
    }

    @Get()
    getAll() {
        return this.countryService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.countryService.getOne(id);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() dto: CreateCountryDto) {
        return this.countryService.update(id, dto);
    }
    


    
}
