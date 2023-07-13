import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateWaifuDto} from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Waifu, WaifuDocument } from "src/schemes/waifu.schema";

import { Anime } from "src/schemes/anime.schema";

@Injectable()
export class WaifuService {
    constructor(
        @InjectModel(Waifu.name) private waifuModel: Model<Waifu>,
        @InjectModel(Anime.name) private animeModel: Model<Anime>,
       
    ) {}

    async create(waifuDto: CreateWaifuDto): Promise<Waifu> {
        try{
            const nameWaifu = waifuDto.name;
            
            const waifu:Waifu  = await this.waifuModel.findOne({name: nameWaifu})
            if (waifu) {
                //Добавляем картинки в массив
                if (waifuDto.image && waifuDto.image.length > 0)
                //Проверяем не совпадает ли картинка с прошлыми 
                waifuDto.image.forEach((image) => { 
                    if (!waifu.image.includes(image)) {
                        waifu.image.push(image);

                    }
                 
                });
            }
            else {
                
                const waifu = await this.waifuModel.create({
                    name: waifuDto.name,
                    image: waifuDto.image,
                    
                });
                console.log(waifu);
                return waifu;
            }
            return waifu;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getAll(): Promise<Waifu[]> {
        try{
            const waifus:Waifu[] = await this.waifuModel.find();
            return waifus;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getOne(id: string): Promise<Waifu> {
        const waifu = await this.waifuModel.findById(id);
        if (!waifu) {
            throw new HttpException('Waifu not found', HttpStatus.NOT_FOUND);
        }
        return waifu;
    }

    async getWaifuByAnime (id: string): Promise<Waifu[]> {
        const waifu = await this.waifuModel.find({anime: id});
        if (!waifu) {
            throw new HttpException('Waifu not found', HttpStatus.NOT_FOUND);
        }
        return waifu;
    }

}



        

