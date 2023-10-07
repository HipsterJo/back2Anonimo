import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from '../schemas/Season.schema';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService],
  imports: [
    MongooseModule.forFeature([
      {name: Season.name, schema: SeasonSchema},
    ])
  ]
})
export class SeasonModule {}
