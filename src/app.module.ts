import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AnimesModule } from './animes/animes.module';
import { CountryModule } from './params/country/country.module';
import { DubService } from './params/dub/dub.service';
import { DubController } from './params/dub/dub.controller';
import { DubModule } from './params/dub/dub.module';
import { StudioModule } from './params/studio/studio.module';
import { GenreModule } from './params/genre/genre.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleService } from './roles/roles.service';
import { RoleController } from './roles/roles.controller';
import { RoleModule } from './roles/roles.module';



@Module({
    controllers: [ 
RoleController],
    providers: [],
    imports: [
        ConfigModule.forRoot(
            {
                envFilePath: '.env'
            }
        ),
        MongooseModule.forRoot(process.env.MONGO_URL),
        AnimesModule,
        CountryModule,
        DubModule,
        StudioModule,
        GenreModule,
        UsersModule,
        AuthModule,
        RoleModule
    ]

    
})
export  class AppModule {}