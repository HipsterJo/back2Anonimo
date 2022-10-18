import { Module } from '@nestjs/common';
import { DubService } from './dub.service';
import { DubController } from './dub.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dub, DubSchema } from '../../schemes/animeParams/dub.scheme';


@Module({
    providers: [DubService],
    controllers: [DubController],
    imports:[
        MongooseModule.forFeature([{ name: Dub.name, schema: DubSchema }]),
    ],
    exports: [DubService]
})
export class DubModule {}
