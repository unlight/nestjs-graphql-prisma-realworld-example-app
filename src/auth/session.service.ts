import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { GraphQLContext } from '../types';
import { PassportUserFields } from './types';

/**
 * TODO: Problem with this Scope.REQUEST every dependant service
 * will be created on every request.
 */
@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    constructor(@Inject(REQUEST) private readonly context: GraphQLContext) {}

    currentUser(): PassportUserFields | undefined {
        return this.context.req?.user;
    }

    currentUserId(): string | undefined {
        return this.context.req?.user?.id;
    }
}
