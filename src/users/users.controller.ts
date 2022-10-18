import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,

    ){}

    

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

}
