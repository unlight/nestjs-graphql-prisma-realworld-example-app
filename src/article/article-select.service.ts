import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { merge } from 'lodash';
import { DeepPartial, PlainObject } from 'simplytyped';

type GraphqlFieldsParameter = DeepPartial<Record<string, PlainObject>>;

@Injectable()
export class ArticleSelectService {
    article(
        graphqlFields: GraphqlFieldsParameter,
        selectStructure: any,
        currentUserId?: string,
    ): Prisma.ArticleSelect {
        const currentUserArgs: Prisma.UserFindManyArgs = {
            select: {
                userId: true,
            },
            where: {
                userId: currentUserId,
            },
        };

        return merge<Prisma.ArticleSelect, Prisma.ArticleSelect, Prisma.ArticleSelect>(
            selectStructure,
            graphqlFields?.author?.isFollowing && currentUserId
                ? {
                      author: {
                          select: {
                              followers: currentUserArgs,
                          },
                      },
                  }
                : {},
            graphqlFields?.favorited && currentUserId
                ? {
                      favoritedBy: currentUserArgs,
                  }
                : {},
        );
    }
}
