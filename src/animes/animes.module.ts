import {forwardRef, Module} from '@nestjs/common';
import { AnimesService } from './animes.service';
import { AnimesController } from './animes.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Anime, AnimeSchema} from "../schemes/anime.schema";  // <--- 1
import {Country, CountrySchema} from "../schemes/animeParams/country.scheme";  // <--- 2
import {Dub, DubSchema} from "../schemes/animeParams/dub.scheme";  // <--- 3
import {Genre, GenreSchema} from "../schemes/animeParams/genre.scheme";  // <--- 4
import {Studio, StudioSchema} from "../schemes/animeParams/studio.scheme";  // <--- 5
import { CountryModule } from 'src/params/country/country.module';
import { GenreModule } from 'src/params/genre/genre.module';
import { StudioModule } from 'src/params/studio/studio.module';
import { DubModule } from 'src/params/dub/dub.module';



@Module({
  providers: [AnimesService],
  controllers: [AnimesController],
  imports: [
    MongooseModule.forFeature([
    {name: Anime.name, schema: AnimeSchema},  
    {name: Country.name, schema: CountrySchema},
    {name: Dub.name, schema: DubSchema},
    {name: Genre.name, schema: GenreSchema},
    {name: Studio.name, schema: StudioSchema},
    ]),
    CountryModule,
    GenreModule,
    StudioModule,
    DubModule,
  ],
  exports: [AnimesService]
})
export class AnimesModule {}