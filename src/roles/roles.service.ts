import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId  } from 'mongoose';
import { Role, RoleDocument } from '../schemes/userParams/roles.scheme';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async create(name: string) {
        const role = await this.roleModel.create({name});
        return role;
    }

    async getAll() {
        const roles = await this.roleModel.find().exec();
        return roles;
    }

    async getOne(id: string) {
        const role = await this.roleModel.findById(id).exec();
        return role;
    }

    async delete(id: string) {
        const role = await this.roleModel.findByIdAndDelete(id).exec();
        return role;
    }
}
