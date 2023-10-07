import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/schemas/schedule.schema';
import { Anime, AnimeSchema } from 'src/schemas/anime.schema';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [
    MongooseModule.forFeature([
      {name: Schedule.name, schema: ScheduleSchema},
      {name: Anime.name, schema: AnimeSchema}
    ])
  ]
})
export class ScheduleModule {}
