import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { CommentService } from './comment.service';

/**
 * Checks if user can edit own entity.
 */
@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private readonly service: CommentService) {}

    async canActivate(context: ExecutionContext) {
        const graphqlContext = GqlExecutionContext.create(context);
        const request = graphqlContext.getContext().req;
        const where: Prisma.CommentWhereUniqueInput | undefined = context.getArgByIndex(
            1,
        )?.where;
        if (!(request.user && where)) {
            return false;
        }
        const entity = await this.service.findUnique({
            where,
            select: { authorId: true },
        });
        return Boolean(entity && entity.authorId === request.user.id);
    }
}
