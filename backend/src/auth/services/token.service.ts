import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IAuthTokens } from '../interfaces/auth-tokens.interface';
import { IJwtTokensConfig } from '../interfaces/jwt-token-config.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: IJwtTokensConfig;

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.jwtConfig = {
      access: {
        secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn:
          configService.getOrThrow<IJwtTokensConfig['access']['expiresIn']>(
            'JWT_ACCESS_EXPIRES',
          ),
      },
      refresh: {
        secret: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: configService.getOrThrow<
          IJwtTokensConfig['refresh']['expiresIn']
        >('JWT_REFRESH_EXPIRES'),
      },
    };
  }

  async generateTokens(payload: IJwtPayload): Promise<IAuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.access.secret,
        expiresIn: this.jwtConfig.access.expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.refresh.secret,
        expiresIn: this.jwtConfig.refresh.expiresIn,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyRefreshToken(refreshToken: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync<IJwtPayload>(refreshToken, {
      secret: this.jwtConfig.refresh.secret,
    });
  }
}
