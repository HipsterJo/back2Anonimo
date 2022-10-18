import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemes/user.scheme';
import { UserCreateDTO } from 'src/users/dto/user-create.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService) {}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
       
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    
    async login(user: any) {
        const {...UserDTo} = user._doc;
        const payload = { email: user._doc, sub: user.isVerified };
        console.log(UserDTo)
        return {
            
            access_token: this.jwtService.sign(payload),
        };
        
    }

    async generateJwtToken (user: UserDocument) {
        const payload = { email: user.email, sub: user.isVerified };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: UserCreateDTO) {

        const {password, ...userDate} = await this.usersService.create(user);
        return{
            ...userDate,
            access_token: this.jwtService.sign(userDate),
        }
    }
    

}
