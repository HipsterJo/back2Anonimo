import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dub, DubDocument } from '../../schemes/animeParams/dub.scheme';
import { CreateDubDto } from './dto/create-dub.dto';

@Injectable()
export class DubService {
    constructor(
        @InjectModel(Dub.name) private dubModel: Model<DubDocument>,
    ) {}

    async create(dto: CreateDubDto) {
        const dub = await this.dubModel.create(dto);
        return dub;
       }

    async getAll() {
        const dubs = await this.dubModel.find().exec();
        return dubs;
    }

    async getOne(id: string) {
        const dub = await this.dubModel.findById(id).exec();
        return dub;
    }
    
    async delete(id: string) {
        
        const dub = await this.dubModel.findByIdAndDelete(id).exec();
        return dub;
    }

    async getIdByParam(params: string[]) {
        const dubers: DubDocument[] = await this.dubModel.find({param: {$in: params}}).exec();
        const dubersID = dubers.map(genre => genre._id);
        if(!dubersID){
            throw new HttpException('Некоторые студии озвучки не найдены', HttpStatus.NOT_FOUND);
        }
        
        return dubersID;
    }

    


}
