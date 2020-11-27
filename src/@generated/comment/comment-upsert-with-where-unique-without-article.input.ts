import { InputType, Field } from '@nestjs/graphql';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateWithoutArticleInput } from './comment-update-without-article.input';
import { CommentCreateWithoutArticleInput } from './comment-create-without-article.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutArticleInput {
    @Field(() => CommentWhereUniqueInput, {
        nullable: true,
    })
    where?: CommentWhereUniqueInput;

    @Field(() => CommentUpdateWithoutArticleInput, {
        nullable: true,
    })
    update?: CommentUpdateWithoutArticleInput;

    @Field(() => CommentCreateWithoutArticleInput, {
        nullable: true,
    })
    create?: CommentCreateWithoutArticleInput;
}