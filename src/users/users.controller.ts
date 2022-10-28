import { Controller, Body, Param, Get, Post, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-upadate.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,

    ){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    update(@Request() req, @Body() userDto: UserUpdateDto) {
        return this.usersService.update(userDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('favorites')
    addFavorite(@Request() req, @Body() id: string) {
        return this.usersService.addFavorite(req.user.email, id);
    }

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
