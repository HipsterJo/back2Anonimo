import {Prop, Schema,   SchemaFactory} from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';


export type RelationsDocument = HydratedDocument<Relations>;

@Schema()
export  class Relations {
    @Prop()
    //array routes
    sequel?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    prequel?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    parent?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    alternative?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    other?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    sideStory?: [{type: string, refPath: 'Anime'}];

    @Prop()
    //array routes
    spinoff?: [{type: string, refPath: 'Anime'}];

}

