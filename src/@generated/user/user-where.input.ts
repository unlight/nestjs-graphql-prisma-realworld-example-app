import { Field, InputType } from '@nestjs/graphql';

import { ArticleListRelationFilter } from '../article/article-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UserListRelationFilter } from './user-list-relation-filter.input';

@InputType()
export class UserWhereInput {
    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    AND?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    OR?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    NOT?: Array<UserWhereInput>;

    @Field(() => StringFilter, {
        nullable: true,
    })
    userId?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    email?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    name?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    password?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    bio?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    image?: StringFilter;

    @Field(() => UserListRelationFilter, {
        nullable: true,
    })
    following?: UserListRelationFilter;

    @Field(() => UserListRelationFilter, {
        nullable: true,
    })
    followers?: UserListRelationFilter;

    @Field(() => ArticleListRelationFilter, {
        nullable: true,
    })
    favoriteArticles?: ArticleListRelationFilter;

    @Field(() => ArticleListRelationFilter, {
        nullable: true,
    })
    Article?: ArticleListRelationFilter;

    @Field(() => CommentListRelationFilter, {
        nullable: true,
    })
    Comment?: CommentListRelationFilter;
}
