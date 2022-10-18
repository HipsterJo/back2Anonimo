import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from '../../schemes/animeParams/genre.scheme';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports:[
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  exports: [GenreService]
})
export class GenreModule {}
