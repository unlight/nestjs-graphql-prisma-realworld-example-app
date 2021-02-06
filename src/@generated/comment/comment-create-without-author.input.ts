import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateNestedOneWithoutCommentsInput } from '../prisma/article-create-nested-one-without-comments.input';


@InputType()
export class CommentCreateWithoutAuthorInput {

    @Field(() => String, {
            nullable: true,
        })
    commentId?: string;

    @Field(() => Date, {
            nullable: true,
        })
    createdAt?: Date | string;

    @Field(() => Date, {
            nullable: true,
        })
    updatedAt?: Date | string;

    @Field(() => String, {
            nullable: false,
        })
    body!: string;

    @Field(() => ArticleCreateNestedOneWithoutCommentsInput, {
            nullable: true,
        })
    article?: ArticleCreateNestedOneWithoutCommentsInput;
}
