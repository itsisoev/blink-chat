import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserCode } from '../common/message-code/user-code.enum';
import { AuthCode } from '../common/message-code/auth-code.enum';
import { IUploadedFile } from '../storage/uploaded-file.interface';
import { createApiResponse } from '../common/utils/create-api-response';
import { IApiResponse } from '../common/http/interfaces/api-response.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IJwtTokensConfig } from './interfaces/jwt-token-config.interface';

@Injectable()
export class AuthService {
  private readonly jwtConfig: IJwtTokensConfig = {
    access: {
      secret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
      expiresIn: (process.env.JWT_ACCESS_EXPIRES ??
        '15m') as IJwtTokensConfig['access']['expiresIn'],
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
      expiresIn: (process.env.JWT_REFRESH_EXPIRES ??
        '7d') as IJwtTokensConfig['refresh']['expiresIn'],
    },
  };

  constructor(
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, avatar?: IUploadedFile) {
    const existingUser = await this.usersService.findByUsername(
      registerDto.userName,
    );

    if (existingUser) {
      throw new ConflictException({
        code: UserCode.USERNAME_ALREADY_EXISTS,
      });
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const avatarUrl = avatar
      ? await this.storageService.saveAvatar(avatar)
      : undefined;

    const user = await this.usersService.createUser({
      userName: registerDto.userName,
      passwordHash,
      avatarUrl,
    });

    return createApiResponse(
      {
        uuid: user.uuid,
        userName: user.userName,
        avatarUrl: user.avatarUrl,
        isOnline: user.isOnline,
      },
      UserCode.USER_REGISTERED,
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.userName);

    if (!user) {
      throw new UnauthorizedException({ code: AuthCode.INVALID_CREDENTIALS });
    }

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({ code: AuthCode.INVALID_CREDENTIALS });
    }

    const tokens = await this.generateTokens({
      sub: user.uuid,
      userName: user.userName,
    });

    return createApiResponse(
      {
        user: {
          uuid: user.uuid,
          userName: user.userName,
          avatarUrl: user.avatarUrl,
          isOnline: user.isOnline,
        },
        tokens,
      },
      AuthCode.USER_LOGGED_IN,
    );
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<IApiResponse<IAuthTokens>> {
    let payload: IJwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<IJwtPayload>(
        refreshTokenDto.refreshToken,
        { secret: this.jwtConfig.refresh.secret },
      );
    } catch {
      throw new UnauthorizedException({
        code: AuthCode.INVALID_REFRESH_TOKEN,
      });
    }

    const user = await this.usersService.findByUsername(payload.userName);

    if (!user) {
      throw new UnauthorizedException({ code: AuthCode.UNAUTHORIZED });
    }

    const tokens = await this.generateTokens({
      sub: user.uuid,
      userName: user.userName,
    });

    return createApiResponse(tokens, AuthCode.TOKEN_REFRESHED);
  }

  logout(): IApiResponse<null> {
    return createApiResponse(null, AuthCode.USER_LOGGED_OUT);
  }

  private async generateTokens(payload: IJwtPayload): Promise<IAuthTokens> {
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

    return { accessToken, refreshToken };
  }
}
