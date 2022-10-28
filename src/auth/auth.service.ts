import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwIfEmpty } from 'rxjs';
import { User, UserDocument } from 'src/schemes/user.scheme';
import { UserCreateDTO } from 'src/users/dto/user-create.dto';
import { UsersService } from '../users/users.service';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService) {}
    
    async validateUser(email: string, pass: string): Promise<User|null> {
        const user = await this.usersService.findUserByEmail(email);
        
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    
    async login(user: UserDocument) {
        
        const payload = { email: user.email, isVerified: user.isVerified,
            favorites: user.favorites, role: user.role, history: user.history }; 
        
        return {
            payload,
            access_token: this.jwtService.sign(payload),
        };
        
    }

    async generateJwtToken (user: User) {
        const payload = { email: user.email, sub: user.isVerified };
        console.log(payload)
        return {
            payload,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: UserCreateDTO) {
        try{
        const {password, ...userDate} = await this.usersService.create(user);
        const payload = { email: userDate.email, sub: userDate.isVerified };
        console.log(payload)
        return{
            payload,
            access_token: this.jwtService.sign(payload),
        }
        }catch(e){
            throw new ForbiddenException('User with same email already exists');

        }

    }
    

}
