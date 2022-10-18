import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from '../../schemes/animeParams/country.scheme';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports:[
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  exports: [CountryService]
  
})
export class CountryModule {}
