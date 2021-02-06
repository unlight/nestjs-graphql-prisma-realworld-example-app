import { Field, InputType } from '@nestjs/graphql';
import { CommentCreateOrConnectWithoutarticleInput } from '../comment/comment-create-or-connect-withoutarticle.input';
import { CommentCreateWithoutArticleInput } from '../comment/comment-create-without-article.input';
import { CommentWhereUniqueInput } from '../comment/comment-where-unique.input';

@InputType()
export class CommentCreateNestedManyWithoutArticleInput {

    @Field(() => [CommentCreateWithoutArticleInput], {
            nullable: true,
        })
    create?: Array<CommentCreateWithoutArticleInput>;

    @Field(() => [CommentCreateOrConnectWithoutarticleInput], {
            nullable: true,
        })
    connectOrCreate?: Array<CommentCreateOrConnectWithoutarticleInput>;

    @Field(() => [CommentWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<CommentWhereUniqueInput>;
}
