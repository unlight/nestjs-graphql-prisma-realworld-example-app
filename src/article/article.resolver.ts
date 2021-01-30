import { ArticleWhereInput } from '@generated/article/article-where.input';
import { ArticleWhereUniqueInput } from '@generated/article/article-where-unique.input';
import { FindManyArticleArgs } from '@generated/article/find-many-article.args';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import {
    ConflictException,
    Logger,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import {
    Args,
    Info,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { CurrentUser } from 'app_modules/current-user-decorator';
import {
    GraphqlFields,
    GraphqlFieldsParameter,
} from 'app_modules/nestjs-graphql-fields';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';
import assert from 'assert';
import { GraphQLResolveInfo } from 'graphql';
import { PlainObject } from 'simplytyped';

import { PassportUserFields } from '../types';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
import { ArticleSelectService } from './article-select.service';
import { AuthorGuard } from './author.guard';
import { Article } from './models/article.model';
import { ArticleCreateInput } from './models/article-create.input';
import { ArticleUpdateInput } from './models/article-update.input';

/**
 * Resolver for article type.
 */
@Resolver(() => Article)
export class ArticleResolver {
    private readonly logger = new Logger(ArticleResolver.name);

    constructor(
        private readonly service: ArticleService,
        private readonly userService: UserService,
        private readonly selectService: ArticleSelectService,
    ) {}

    /**
     * Query articles.
     */
    @Query(() => [Article])
    @UseGuards(OptionalGraphqlAuthGuard)
    async articles(
        @Args() args: FindManyArticleArgs,
        @Info() info: GraphQLResolveInfo,
        @GraphqlFields() graphqlFields: GraphqlFieldsParameter,
        @CurrentUser() currentUser?: PassportUserFields,
    ) {
        // TODO: Use dataloader here
        // FIXME: This is wrong usage favorited and favoritedBy cannot be used together
        // favoritedBy will be restricted to current user
        const select = this.selectService.article(
            graphqlFields,
            new PrismaSelect(info, { defaultFields: { User: { userId: true } } }).value
                .select,
            currentUser?.id,
        );

        return this.service.findMany({
            select,
            ...args,
        });
    }

    /**
     * Checks if article is favorited by current user.
     */
    @ResolveField(() => Boolean)
    async favorited(
        @Parent() article: Article,
        @CurrentUser() currentUser?: PassportUserFields,
    ): Promise<boolean> {
        if (!currentUser) {
            return false;
        }
        if (Array.isArray(article.favoritedBy)) {
            return article.favoritedBy.some(user => user.userId === currentUser.id);
        } else {
            this.logger.warn(
                'Article.favoritedBy is not defined',
                'Performance Warning',
            );
        }
        assert(article.articleId);
        return this.service.isFavorited(article.articleId, currentUser.id);
    }

    @ResolveField(() => [User])
    async favoritedBy(
        @Parent() article: Partial<Article>,
        @Args() args: FindManyUserArgs,
    ) {
        if (Array.isArray(article.favoritedBy)) {
            // Already resolved by PrismaSelect plugin
            return article.favoritedBy;
        }
        this.logger.warn('Article.favoritedBy is not defined', 'Performance Warning');
        return this.userService.findMany({
            ...args,
            where: {
                ...args.where,
                favoriteArticles: {
                    some: {
                        articleId: article.articleId,
                    },
                },
            },
        });
    }

    @Query(() => Int)
    @UseGuards(OptionalGraphqlAuthGuard)
    async countArticles(
        @Args({ name: 'where', nullable: true, type: () => ArticleWhereInput })
        where: ArticleWhereInput,
        @Args({ name: 'feed', nullable: true, type: () => Boolean })
        feed: boolean,
        @CurrentUser() currentUser?: PassportUserFields,
    ) {
        if (feed && currentUser) {
            where = this.service.feedWhereConditions(currentUser.id);
        }
        return this.service.count(where);
    }

    @Query(() => Article, { nullable: true })
    @UseGuards(OptionalGraphqlAuthGuard)
    async article(
        @Args('where') where: ArticleWhereUniqueInput,
        @Info() info: GraphQLResolveInfo,
        @GraphqlFields() graphqlFields: GraphqlFieldsParameter,
        @CurrentUser() currentUser?: PassportUserFields,
    ) {
        const select = new PrismaSelect(info).value;
        const articleSelect = this.selectService.article(
            graphqlFields,
            currentUser?.id,
        );

        PrismaSelect.mergeDeep(select, {
            select: articleSelect,
        });

        PrismaSelect.mergeDeep(select, {
            select: articleSelect,
        });
        return this.service.findUnique({
            where,
            ...select,
        });
    }

    @Query(() => [Article], { nullable: false })
    @UseGuards(GraphqlAuthGuard)
    async feed(
        @Args({ defaultValue: 0, name: 'offset', type: () => Int }) offset = 0,
        @Args({ defaultValue: 20, name: 'limit', type: () => Int }) limit = 20,
        @CurrentUser() user: PassportUserFields,
        @GraphqlFields() fields: PlainObject,
    ) {
        return this.service.findMany({
            where: this.service.feedWhereConditions(user.id),
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
                favoritedBy: fields.favorited
                    ? {
                          take: 1,
                          select: { userId: true },
                          where: { userId: user.id },
                      }
                    : false,
            },
            orderBy: { articleId: 'desc' },
            skip: offset,
            take: limit,
        });
    }

    @Mutation(() => Article)
    @UseGuards(GraphqlAuthGuard)
    async createArticle(
        @Args('input') input: ArticleCreateInput,
        @CurrentUser() author: PassportUserFields,
    ) {
        return this.service.create({ input, author });
    }

    @Mutation(() => Article)
    @UseGuards(GraphqlAuthGuard, AuthorGuard)
    async updateArticle(
        @Args('data') data: ArticleUpdateInput,
        @Args('where') where: ArticleWhereUniqueInput,
        @GraphqlFields() fields: PlainObject,
    ) {
        const article = await this.service.findUnique({ where });
        if (!article) {
            throw new NotFoundException(
                `Article ${JSON.stringify(where)} do not exists`,
            );
        }
        return this.service.updateArticle({
            input: data,
            article,
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
            },
        });
    }

    @Mutation(() => Article, { nullable: true })
    @UseGuards(GraphqlAuthGuard, AuthorGuard)
    async deleteArticle(
        @Args('where') where: ArticleWhereUniqueInput,
        @GraphqlFields() fields: PlainObject,
    ) {
        const article = await this.service.findUnique({ where });
        if (!article) {
            throw new NotFoundException(
                `Article ${JSON.stringify(where)} do not exists`,
            );
        }
        return this.service.delete({
            where,
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
            },
        });
    }

    @Mutation(() => Article)
    @UseGuards(GraphqlAuthGuard)
    async favoriteArticle(
        @Args('where') where: ArticleWhereUniqueInput,
        @Args('value') value: boolean,
        @GraphqlFields() fields: PlainObject,
        @CurrentUser() currentUser: PassportUserFields,
    ) {
        const article = await this.service.findUnique({
            where,
            include: {
                favoritedBy: {
                    take: 1,
                    where: { userId: currentUser.id },
                },
            },
        });
        if (!article) {
            throw new NotFoundException(`Article do not exists`);
        }
        if (value && article.favoritedBy.length > 0) {
            throw new ConflictException(`Article is already in favorite list`);
        }
        if (!value && article.favoritedBy.length === 0) {
            throw new ConflictException(`Article is not in favorite list`);
        }
        return this.service.favorite({
            article,
            favoritedByUserId: currentUser.id,
            value,
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
            },
        });
    }
}
