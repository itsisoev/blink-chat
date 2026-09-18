import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { AuthCode } from '../../common/message-code/auth-code.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.usersService.findByUsername(payload.userName);

    if (!user) {
      throw new UnauthorizedException({ code: AuthCode.UNAUTHORIZED });
    }

    return {
      uuid: user.uuid,
      userName: user.userName,
    };
  }
}
