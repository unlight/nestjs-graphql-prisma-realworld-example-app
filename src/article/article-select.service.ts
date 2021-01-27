import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DeepPartial, PlainObject } from 'simplytyped';

type GraphqlFieldsParameter = DeepPartial<Record<string, PlainObject>>;

@Injectable()
export class ArticleSelectService {
    article(
        graphqlFields: GraphqlFieldsParameter,
        currentUserId?: string,
    ): Prisma.ArticleSelect {
        return {
            author:
                graphqlFields?.author?.isFollowing && currentUserId
                    ? {
                          select: {
                              userId: true,
                              followers: {
                                  select: {
                                      userId: true,
                                  },
                                  where: {
                                      userId: currentUserId,
                                  },
                              },
                          },
                      }
                    : {},
            favoritedBy:
                graphqlFields?.favorited && currentUserId
                    ? {
                          select: {
                              userId: true,
                          },
                          where: {
                              userId: currentUserId,
                          },
                      }
                    : {},
        };
    }
}
