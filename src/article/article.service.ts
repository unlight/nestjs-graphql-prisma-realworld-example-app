import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';

import { TagService } from '../tag/tag.service';
import { ArticleRepository } from './article.repository';
import { ArticleCreateInput } from './models/article-create.input';
import { ArticleUpdateInput as ArticleUpdateInputModel } from './models/article-update.input';
import { SlugService } from './slug/slug.service';

/**
 * Service for managing articles.
 */
@Injectable()
export class ArticleService {
    update = this.prisma.update;
    delete = this.prisma.delete;
    findUnique = this.prisma.findUnique;
    findMany = this.prisma.findMany;

    constructor(
        private readonly prisma: ArticleRepository,
        private readonly slug: SlugService,
        private readonly tag: TagService,
    ) {}

    async updateArticle(args: {
        input: ArticleUpdateInputModel;
        where?: Prisma.ArticleWhereUniqueInput;
        article?: Article;
        include?: Prisma.ArticleInclude;
    }) {
        const article =
            args.article ||
            (args.where && (await this.findUnique({ where: args.where })));
        if (!article) {
            throw new TypeError(
                'Expected Article or ArticleWhereUniqueInput arguments',
            );
        }

        // const [existingTags, newTags] = await Promise.all([
        //     this.tag.findMany({
        //         select: { id: true },
        //         where: { articles: { every: { id: { equals: article.id } } } },
        //     }),
        //     this.tag.createTags(args.input.tags || []),
        // ]);

        return this.prisma.update({
            data: {
                title: args.input.title,
                description: args.input.description,
                body: args.input.body,
                // todo: Figure out why connect disconnect does not work
                // tags: {
                //     disconnect: existingTags,
                //     connect: newTags.map((tag) => ({ id: tag.id })),
                // },
            },
            where: {
                articleId: article.articleId,
            },
            include: args.include,
        });
    }

    async isSlugUnique(slug: string) {
        const entity = await this.findUnique({
            where: { slug },
        });
        return entity === null;
    }

    /**
     * Create article from input, user.
     */
    async create({
        input,
        author,
    }: {
        input: ArticleCreateInput;
        author: { id: string };
    }) {
        const tags = await this.tag.createTags(input.tags || []);
        const data: Prisma.ArticleCreateInput = {
            slug: await this.slug.generate(input.title, slug =>
                this.isSlugUnique(slug),
            ),
            title: input.title,
            body: input.body,
            description: input.description,
            author: {
                connect: {
                    userId: author.id,
                },
            },
            tags: {
                connect: tags.map(tag => ({ tagId: tag.tagId })),
            },
        };
        return this.prisma.create({
            data,
            include: {
                author: true,
                tags: true,
            },
        });
    }

    /**
     * Get count article by condition.
     */
    async count(where: Prisma.ArticleWhereInput) {
        return this.prisma.count({ where });
    }

    /**
     * Checks if article with {id} favorited by user {userId}.
     */
    async isFavorited(articleId: string, userId: string) {
        const count = await this.prisma.count({
            take: 1,
            where: { articleId, favoritedBy: { some: { userId } } },
        });
        return count > 0;
    }

    feedWhereConditions(userId: string) {
        return {
            author: {
                followers: { some: { userId: { equals: userId } } },
            },
        };
    }

    /**
     * Favorite or unfavorite article {article or where} by user {favoritedByUserId}.
     */
    async favorite(args: {
        article?: Article;
        where?: Prisma.ArticleWhereUniqueInput;
        favoritedByUserId: string;
        value: boolean;
        include?: Prisma.ArticleInclude;
    }) {
        const article =
            args.article ||
            (args.where && (await this.findUnique({ where: args.where })));
        if (!article) {
            throw new TypeError(
                'Expected Article or ArticleWhereUniqueInput arguments',
            );
        }

        const user = { userId: args.favoritedByUserId };
        // todo: numeric operation
        const favoritesCount = article.favoritesCount + (args.value ? +1 : -1);

        return this.update({
            data: {
                favoritedBy: args.value ? { connect: user } : { disconnect: user },
                favoritesCount,
            },
            where: { articleId: article.articleId },
            include: args.include,
        });
    }
}
