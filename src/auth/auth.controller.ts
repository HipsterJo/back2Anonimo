import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import {UsersService} from '../users/users.service';
import {UserCreateDTO} from '../users/dto/user-create.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        ) { }
        
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
     async login(@Request() req) {
         return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body()dto: UserCreateDTO) {
        return this.authService.register(dto);
        
    }


    

    
    
}
