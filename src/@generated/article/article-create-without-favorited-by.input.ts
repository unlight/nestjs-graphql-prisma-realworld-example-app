import { Field, InputType, Int } from '@nestjs/graphql';
import { CommentCreateNestedManyWithoutArticleInput } from '../prisma/comment-create-nested-many-without-article.input';
import { TagCreateNestedManyWithoutArticlesInput } from '../prisma/tag-create-nested-many-without-articles.input';
import { UserCreateNestedOneWithoutArticleInput } from '../prisma/user-create-nested-one-without-article.input';


@InputType()
export class ArticleCreateWithoutFavoritedByInput {

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

    @Field(() => TagCreateNestedManyWithoutArticlesInput, {
            nullable: true,
        })
    tags?: TagCreateNestedManyWithoutArticlesInput;

    @Field(() => UserCreateNestedOneWithoutArticleInput, {
            nullable: true,
        })
    author?: UserCreateNestedOneWithoutArticleInput;

    @Field(() => CommentCreateNestedManyWithoutArticleInput, {
            nullable: true,
        })
    comments?: CommentCreateNestedManyWithoutArticleInput;
}
