import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { ArticleService } from './article.service';

/**
 * Checks if user can edit own article.
 */
@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private readonly articleService: ArticleService) {}

    async canActivate(context: ExecutionContext) {
        const graphqlContext = GqlExecutionContext.create(context);
        const request = graphqlContext.getContext().req;
        const where: Prisma.ArticleWhereUniqueInput | undefined = context.getArgByIndex(
            1,
        )?.where;
        if (!(request.user && where)) {
            return false;
        }
        const article = await this.articleService.findUnique({
            where,
            select: { authorId: true },
        });
        return Boolean(article && article.authorId === request.user.id);
    }
}
