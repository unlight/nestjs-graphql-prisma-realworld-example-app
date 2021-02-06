import { Field, InputType, Int } from '@nestjs/graphql';
import { CommentUncheckedCreateNestedManyWithoutArticleInput } from '../comment/comment-unchecked-create-nested-many-without-article.input';


@InputType()
export class ArticleUncheckedCreateWithoutAuthorInput {

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

    @Field(() => CommentUncheckedCreateNestedManyWithoutArticleInput, {
            nullable: true,
        })
    comments?: CommentUncheckedCreateNestedManyWithoutArticleInput;
}
