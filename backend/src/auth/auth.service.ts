import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { IUploadedFile } from '../storage/uploaded-file.interface';
import { createApiResponse } from '../common/utils/create-api-response';
import { IApiResponse } from '../common/http/interfaces/api-response.interface';
import { UserCode } from '../common/message-code/user-code.enum';
import { AuthCode } from '../common/message-code/auth-code.enum';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto, avatar?: IUploadedFile) {
    const existingUser = await this.usersService.findPublicUserByUsername(
      registerDto.userName,
    );

    if (existingUser) {
      throw new ConflictException({
        code: UserCode.USERNAME_ALREADY_EXISTS,
      });
    }

    const passwordHash = await this.passwordService.hashPassword(
      registerDto.password,
    );

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
    const user = await this.usersService.findUserWithPasswordByUsername(
      loginDto.userName,
    );

    if (!user) {
      throw new UnauthorizedException({
        code: AuthCode.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await this.passwordService.verifyPassword(
      user.passwordHash,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        code: AuthCode.INVALID_CREDENTIALS,
      });
    }

    const payload: IJwtPayload = {
      sub: user.uuid,
      userName: user.userName,
    };

    const tokens = await this.tokenService.generateTokens(payload);

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
      payload = await this.tokenService.verifyRefreshToken(
        refreshTokenDto.refreshToken,
      );
    } catch {
      throw new UnauthorizedException({
        code: AuthCode.INVALID_REFRESH_TOKEN,
      });
    }

    const user = await this.usersService.findPublicUserByUuid(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        code: AuthCode.UNAUTHORIZED,
      });
    }

    const newPayload: IJwtPayload = {
      sub: user.uuid,
      userName: user.userName,
    };

    const tokens = await this.tokenService.generateTokens(newPayload);

    return createApiResponse(tokens, AuthCode.TOKEN_REFRESHED);
  }

  logout(): IApiResponse<null> {
    return createApiResponse(null, AuthCode.USER_LOGGED_OUT);
  }
}
