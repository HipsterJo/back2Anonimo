import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Studio, StudioDocument } from '../../schemes/animeParams/studio.scheme';
import { CreateStudioDto } from './dto/create-studio.dto';


@Injectable()
export class StudioService {
    constructor(
        @InjectModel(Studio.name) private studioModel: Model<StudioDocument>,
    ) {}

    async create(dto: CreateStudioDto) {
        const studio = await this.studioModel.create(dto);
        return studio;
    }

    async getAll() {
        const studios = await this.studioModel.find().exec();
        return studios;
    }
    
    async getOne(id: string) {
        const studio = await this.studioModel.findById(id).exec();
        return studio;
    }

    async delete(id: string) {
        const studio = await this.studioModel.findByIdAndDelete(id).exec();
        return studio;
    }

    async update(id: string, dto: CreateStudioDto) {
        const studio = await this.studioModel.findByIdAndUpdate(id, dto, {new: true}).exec();
        return studio;
    }

    async getIdByParam(param: string) {
        const studio = await this.studioModel.findOne({param}).exec();
        return studio._id;
    }
    
    

   

    
}
