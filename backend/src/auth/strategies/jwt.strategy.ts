import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { AuthCode } from '../../common/message-code/auth-code.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.usersService.findPublicUserByUuid(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        code: AuthCode.UNAUTHORIZED,
      });
    }

    return {
      uuid: user.uuid,
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      isOnline: user.isOnline,
    };
  }
}
