import { Field, InputType, Int } from '@nestjs/graphql';

import { CommentUncheckedUpdateManyWithoutArticleInput } from '../comment/comment-unchecked-update-many-without-article.input';

@InputType()
export class ArticleUncheckedUpdateWithoutTagsInput {
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

    @Field(() => String, {
        nullable: true,
    })
    authorId?: string;

    @Field(() => CommentUncheckedUpdateManyWithoutArticleInput, {
        nullable: true,
    })
    comments?: CommentUncheckedUpdateManyWithoutArticleInput;
}
