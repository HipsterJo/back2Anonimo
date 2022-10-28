import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId  } from 'mongoose';
import { User, UserDocument } from '../schemes/user.scheme';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-upadate.dto';

@Injectable()
export class UsersService {
        constructor(
            @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async create(userDto: UserCreateDTO): Promise<User> {

            const createdUser = new this.userModel(userDto);
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

        async findUserByEmail(email: string): Promise<UserDocument> {   
            return await this.userModel.findOne({email}).exec();
        }

        async update(userDto: UserUpdateDto, id:string): Promise<User> {
            return await this.userModel.findByIdAndUpdate(id, userDto, {new: true});
        }

        async addFavorite(email: string, favoriteId: string) {

            const user = await this.findUserByEmail(email);
            if(!user.favorites.includes(favoriteId)) {
                user.favorites.push(favoriteId);
                await this.userModel.findByIdAndUpdate(user._id, user, {new: true});
                return user.favorites;
            }
            
            throw new Error("Товар не добавлен в избранное");

        }

        
}
