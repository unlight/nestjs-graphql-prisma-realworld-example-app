import { Field, InputType, Int } from '@nestjs/graphql';

import { CommentUncheckedCreateManyWithoutArticleInput } from '../comment/comment-unchecked-create-many-without-article.input';

@InputType()
export class ArticleUncheckedCreateWithoutFavoritedByInput {
    @Field(() => String, {
        nullable: true,
    })
    articleId?: string;

    @Field(() => String, {
        nullable: false,
    })
    slug!: string;

    @Field(() => String, {
        nullable: false,
    })
    title!: string;

    @Field(() => String, {
        nullable: false,
    })
    description!: string;

    @Field(() => String, {
        nullable: false,
    })
    body!: string;

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

    @Field(() => CommentUncheckedCreateManyWithoutArticleInput, {
        nullable: true,
    })
    comments?: CommentUncheckedCreateManyWithoutArticleInput;
}
