import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

import { AppEnvironment } from '../app.environment';
import { User } from '../user/models/user.model';
import { SessionTokenFields } from './types';

/**
 * Authentication service.
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly appEnvironment: AppEnvironment,
    ) {}

    /**
     * Returns accessToken.
     */
    async session(user: Pick<User, 'userId' | 'email'>) {
        const date = new Date();

        const payload: SessionTokenFields = {
            sub: user.userId,
            email: user.email,
        };

        const accessTokenExpiresIn = this.appEnvironment.accessTokenExpiresIn;
        const refreshTokenExpiresIn = this.appEnvironment.refreshTokenExpiresIn;

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: accessTokenExpiresIn / 1000,
            }),
            refreshToken: randomBytes(Math.random() * 20 + 20).toString('hex'), // tslint:disable-line:insecure-random
            accessTokenExpiresAt: date.getTime() + accessTokenExpiresIn,
            refreshTokenExpiresAt: date.getTime() + refreshTokenExpiresIn,
        };
    }

    /**
     * Get user from store by refresh token and return new session.
     */
    // public async refresh(where: {}) {
    //     const authEntity = this.userService.findUnique(where);

    //     if (!authEntity || authEntity.refreshTokenExpiresAt > new Date().getTime()) {
    //         throw new UnauthorizedException();
    //     }

    //     return this.session(authEntity.user);
    // }
}
