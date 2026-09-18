import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtTokenConfig {
  secret: string;
  expiresIn: JwtSignOptions['expiresIn'];
}

export interface IJwtTokensConfig {
  access: IJwtTokenConfig;
  refresh: IJwtTokenConfig;
}
