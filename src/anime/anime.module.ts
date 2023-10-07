import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Mongoose } from 'mongoose';
import { Anime, AnimeSchema } from 'src/schemas/anime.schema';
import { Genre, GenreSchema } from 'src/schemas/genre.schema';
import { Studio, StudioSchema } from 'src/schemas/studio.schema';
import { MediaType, MediaTypeSchema } from 'src/schemas/mediaType.schema';
import { Season, SeasonSchema } from 'src/schemas/season.schema';
import { Stats, StatsSchema } from 'src/schemas/stats.schema';


import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [
    MongooseModule.forFeature([
      {name: Anime.name, schema: AnimeSchema},
      {name: Genre.name, schema: GenreSchema},
      {name: Studio.name, schema: StudioSchema},
      {name: MediaType.name, schema: MediaTypeSchema},
      {name: Season.name, schema: SeasonSchema},
      {name: Stats.name, schema: StatsSchema},
    ])
  ]
  
  
})
export class AnimeModule {}
