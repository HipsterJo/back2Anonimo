import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from '../../schemes/animeParams/country.scheme';
import { CreateCountryDto } from './dto/create-country.dto';


@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    ) {}

    async create(dto: CreateCountryDto) {
        const country = await this.countryModel.create(dto);
        return country;
    }

    async getAll() {
        const countries = await this.countryModel.find().exec();
        return countries;
    }

    async getOne(id: string) {
        const country = await this.countryModel.findById(id).exec();
        return country;
    }

    async delete(id: string) {
        const country = await this.countryModel.findByIdAndDelete(id).exec();
        return country;
    }

    async update(id: string, dto: CreateCountryDto) {
        const country = await this.countryModel.findByIdAndUpdate(id, dto, {new: true}).exec();
        return country;
    }

    async getIdByParam(param: string) {
        const country = await this.countryModel.findOne({param}).exec();
        return country._id;
    }
    

    
}
