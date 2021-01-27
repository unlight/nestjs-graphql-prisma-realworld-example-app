import { Field, InputType, Int } from '@nestjs/graphql';

import { CommentUpdateManyWithoutArticleInput } from '../comment/comment-update-many-without-article.input';
import { TagUpdateManyWithoutArticlesInput } from '../tag/tag-update-many-without-articles.input';
import { UserUpdateOneWithoutArticleInput } from '../user/user-update-one-without-article.input';

@InputType()
export class ArticleUpdateWithoutFavoritedByInput {
    @Field(() => String, {
        nullable: true,
    })
    articleId?: string;

    @Field(() => String, {
        nullable: true,
    })
    slug?: string;

    @Field(() => String, {
        nullable: true,
    })
    title?: string;

    @Field(() => String, {
        nullable: true,
    })
    description?: string;

    @Field(() => String, {
        nullable: true,
    })
    body?: string;

    @Field(() => Date, {
        nullable: true,
    })
    createdAt?: Date | string;

    @Field(() => Date, {
        nullable: true,
    })
    updatedAt?: Date | string;

    @Field(() => Int, {
        nullable: true,
    })
    favoritesCount?: number;

    @Field(() => TagUpdateManyWithoutArticlesInput, {
        nullable: true,
    })
    tags?: TagUpdateManyWithoutArticlesInput;

    @Field(() => UserUpdateOneWithoutArticleInput, {
        nullable: true,
    })
    author?: UserUpdateOneWithoutArticleInput;

    @Field(() => CommentUpdateManyWithoutArticleInput, {
        nullable: true,
    })
    comments?: CommentUpdateManyWithoutArticleInput;
}
