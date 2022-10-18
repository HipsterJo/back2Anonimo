import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
  ) {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: {sub: string, email: string}) {
    const user = this.userService.findUserByEmail(payload.email);
    if(!user) {
      throw new UnauthorizedException("Нет доступа к данному ресурсу");
    }
    console.log(payload)
    return { userId: payload.sub, email: payload.email };
  }
}