import { ArticleWhereUniqueInput } from '@generated/article/article-where-unique.input';
import { CommentWhereUniqueInput } from '@generated/comment/comment-where-unique.input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'app_modules/current-user-decorator';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';

import { ArticleService } from '../article/article.service';
import { PassportUserFields } from '../types';
import { AuthorGuard } from './author.guard';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { CreateCommentInput } from './models/create-comment.input';

/**
 * Resolver for article comment type.
 */
@Resolver(() => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly articleService: ArticleService,
    ) {}

    @Query(() => [Comment])
    @UseGuards(OptionalGraphqlAuthGuard)
    async articleComments(
        @Args('where') where: ArticleWhereUniqueInput,
        @CurrentUser() currentUser: PassportUserFields,
    ) {
        await this.articleService.findUnique({ where, rejectOnNotFound: true });
        return this.commentService.get({ where, follower: currentUser });
    }

    @Mutation(() => Comment)
    @UseGuards(GraphqlAuthGuard)
    async createComment(
        @Args('data') data: CreateCommentInput,
        @Args('where') where: ArticleWhereUniqueInput,
        @CurrentUser() currentUser: PassportUserFields,
    ) {
        await this.articleService.findUnique({ where, rejectOnNotFound: true });
        return this.commentService.createComment({
            where,
            body: data.body,
            authorId: currentUser.id,
        });
    }

    @Mutation(() => Comment)
    @UseGuards(GraphqlAuthGuard, AuthorGuard)
    async deleteComment(@Args('where') where: CommentWhereUniqueInput) {
        return this.commentService.delete({ where });
    }
}
