import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId  } from 'mongoose';
import { User, UserDocument } from '../schemes/user.scheme';
import { UserCreateDTO } from './dto/user-create.dto';

@Injectable()
export class UsersService {
        constructor(
            @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async create(userDto: UserCreateDTO): Promise<User> {

            const createdUser = new this.userModel(userDto);
            console.log(createdUser)
            return createdUser.save();
        }

        async delete(id): Promise<User> {
            return await this.userModel.findByIdAndRemove(id);
        }

        async getAll(): Promise<User[]> {
            return await this.userModel.find().exec();
        }

        async findOne(id): Promise<User> {
            return await this.userModel.findById(id).exec();
        }

        async findUserByEmail(email: string): Promise<User> {   
            return await this.userModel.findOne({email}).exec();
        }

        async update(id: ObjectId, userDto: UserCreateDTO): Promise<User> {
            return await this.userModel.findByIdAndUpdate(id, userDto, {new: true});
        }
}
