import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PlainObject } from 'simplytyped';

import { PassportUserFields } from './types';

/**
 * Use jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token') if you have
 * non-standard scheme name.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    /**
     * `user` should be an object supplied by the application after it
     * has been given an opportunity to verify credentials.
     * Will be written to request.user (by default, but it is configurable)
     * `info` is an optional argument containing additional user information.
     * Will be written to request.authInfo.
     * Also, if (error happens) error info will be here too {message, name})
     */
    async validate(payload: PlainObject): Promise<PassportUserFields> {
        return { email: payload.email, id: payload.sub };
    }
}
