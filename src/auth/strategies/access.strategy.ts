import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

type jwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: AccessTokenStrategy.jwtFromRequest,
      secretOrKey: 'access_token_secret',
    });
  }

  private static jwtFromRequest(req: Request): string | null {
    let token = null;
    if (req.cookies && req.cookies['session_token']) {
      token = req.cookies['session_token'];
    }
    return token;
  }

  validate(payload: jwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
