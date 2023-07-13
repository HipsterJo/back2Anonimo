import { Module } from '@nestjs/common';
import { WaifuController } from './waifu.controller';
import { WaifuService } from './waifu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Waifu, WaifuSchema } from '../schemes/waifu.schema';
import { Anime, AnimeSchema } from '../schemes/anime.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Waifu.name, schema: WaifuSchema 
        },
        { name: Anime.name, schema: AnimeSchema
        }]),
 

    ],
    controllers: [WaifuController],
    providers: [WaifuService

    ],
    exports: [WaifuService],
})
export class WaifuModule {}

