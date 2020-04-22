import { FindManyArticleArgs } from '@generated/type-graphql/resolvers/crud/Article/args/FindManyArticleArgs';
import { ArticleWhereInput } from '@generated/type-graphql/resolvers/inputs/ArticleWhereInput';
import { ArticleWhereUniqueInput } from '@generated/type-graphql/resolvers/inputs/ArticleWhereUniqueInput';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'app_modules/current-user-decorator';
import { GraphqlFields } from 'app_modules/nestjs-graphql-fields';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';
import { PlainObject } from 'simplytyped';

import { ArticleService } from './article.service';
import { AuthorGuard } from './author.guard';
import { Article } from './models/article';
import { ArticleCreateInput } from './models/article-create.input';
import { ArticleUpdateInput } from './models/article-update.input';

/**
 * Resolver for article type.
 */
@Resolver(() => Article)
export class ArticleResolver {
    constructor(private readonly service: ArticleService) {}

    @Query(() => [Article])
    async articles(@Args() args: FindManyArticleArgs, @GraphqlFields() fields: PlainObject) {
        return this.service.findMany({
            ...args,
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
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
        @CurrentUser() currentUser?: { id: string },
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
        @GraphqlFields() fields: PlainObject,
    ) {
        return this.service.findOne({
            where,
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
            },
        });
    }

    @Query(() => [Article], { nullable: false })
    @UseGuards(GraphqlAuthGuard)
    async feed(
        @Args({ defaultValue: 0, name: 'offset', type: () => Int }) offset = 0,
        @Args({ defaultValue: 20, name: 'limit', type: () => Int }) limit = 20,
        @CurrentUser() user: { id: string },
        @GraphqlFields() fields: PlainObject,
    ) {
        return this.service.findMany({
            where: this.service.feedWhereConditions(user.id),
            include: {
                author: Boolean(fields.author),
                tags: Boolean(fields.tags),
                favoritedBy: fields.favorited
                    ? {
                          first: 1,
                          select: { id: true },
                          where: { id: { equals: user.id } },
                      }
                    : false,
            },
            orderBy: { id: 'desc' },
            skip: offset,
            first: limit,
        });
    }

    @Mutation(() => Article)
    @UseGuards(GraphqlAuthGuard)
    async createArticle(
        @Args('input') input: ArticleCreateInput,
        @CurrentUser() author: { id: string },
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
        const article = await this.service.findOne({ where });
        if (!article) {
            throw new NotFoundException(`Article ${JSON.stringify(where)} do not exists`);
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
        const article = await this.service.findOne({ where });
        if (!article) {
            throw new NotFoundException(`Article ${JSON.stringify(where)} do not exists`);
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
        @CurrentUser() currentUser: { id: string },
    ) {
        const article = await this.service.findOne({ where });
        if (!article) {
            throw new NotFoundException(`Article ${JSON.stringify(where)} do not exists`);
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

    /**
     * Checks if article is favorited by current user.
     */
    @ResolveField(() => Boolean)
    async favorited(
        @Parent() article: Article,
        @CurrentUser() currentUser?: { id: string },
    ): Promise<boolean> {
        if (!currentUser) {
            return false;
        }
        if (Array.isArray(article.favoritedBy)) {
            return article.favoritedBy.some((user) => user.id === currentUser.id);
        }
        return this.service.isFavorited(article.id, currentUser.id);
    }
}
