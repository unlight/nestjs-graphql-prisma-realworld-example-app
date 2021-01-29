import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaRepository } from '../prisma/prisma.repository';

/**
 * Service for managing article comments.
 */
@Injectable()
export class CommentService {
    update = this.prisma.comment.update;
    delete = this.prisma.comment.delete;
    findUnique = this.prisma.comment.findUnique;
    findMany = this.prisma.comment.findMany;

    constructor(private readonly prisma: PrismaRepository) {}

    async get(args: {
        where: Prisma.ArticleWhereUniqueInput;
        follower?: { id: string };
    }) {
        const parameters: Prisma.CommentFindManyArgs = {
            where: {
                article: args.where,
            },
            orderBy: { commentId: 'desc' },
            include: {
                author: {
                    include: args.follower
                        ? {
                              followers: {
                                  select: { userId: true },
                                  where: { userId: args.follower.id },
                                  take: 1,
                              },
                          }
                        : undefined,
                },
            },
        };
        return this.findMany(parameters);
    }

    async createComment(args: {
        where: Prisma.ArticleWhereUniqueInput;
        body: string;
        authorId: string;
    }) {
        const commentCreateArgs: Prisma.CommentCreateArgs = {
            data: {
                body: args.body,
                author: {
                    connect: { userId: args.authorId },
                },
                article: {
                    connect: args.where,
                },
            },
            include: {
                author: true,
            },
        };
        return this.prisma.comment.create(commentCreateArgs);
    }
}
