import { Module } from '@nestjs/common';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from '../schemas/studio.schema';

@Module({
  controllers: [StudioController],
  providers: [StudioService],
  imports: [
    MongooseModule.forFeature([
      {name: Studio.name, schema: StudioSchema},
    ])
  ]
})
export class StudioModule {}
