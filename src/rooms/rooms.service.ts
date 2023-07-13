import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId  } from 'mongoose';
import { Room, RoomDocument } from '../schemes/room.scheme';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    ) {}

    async create(roomId: string, animeId: string) {
        
        if (roomId != null) {
            const rooms = await this.roomModel.find().exec();
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].roomId == roomId) {
                    return null;
                }
            }
        
            const room = await this.roomModel.create({roomId, animeId});
            return room;
        }
        return null;
    }


    async getAll() {
        const rooms = await this.roomModel.find().exec();
        return rooms;
    }

    async getOne(id: string) {
        const room = await this.roomModel.findById(id).exec();
        return room;
    }

    async delete(id: string) {
        const room = await this.roomModel.findByIdAndDelete(id).exec();
        return room;
    }
}