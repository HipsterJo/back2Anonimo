import { Module } from "@nestjs/common/decorators";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AnimeModule } from "./anime/anime.module";
import { GenreModule } from './genre/genre.module';
import { StudioModule } from './studio/studio.module';
import { ScheduleModule } from "./schedule/schedule.module";



@Module(
    {
        controllers: [
   
        ],
        providers: [],

        imports: [
            ConfigModule.forRoot({envFilePath: '.env'}),
            MongooseModule.forRoot(process.env.MONGO_URL),
            AnimeModule,
            GenreModule,
            StudioModule,
            ScheduleModule

            
            
        ],
        
        
    }
)

export  class AppModule {}