import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateOrConnectWithoutcommentsInput } from '../article/article-create-or-connect-withoutcomments.input';
import { ArticleCreateWithoutCommentsInput } from '../article/article-create-without-comments.input';
import { ArticleWhereUniqueInput } from '../article/article-where-unique.input';

@InputType()
export class ArticleCreateNestedOneWithoutCommentsInput {

    @Field(() => ArticleCreateWithoutCommentsInput, {
            nullable: true,
        })
    create?: ArticleCreateWithoutCommentsInput;

    @Field(() => ArticleCreateOrConnectWithoutcommentsInput, {
            nullable: true,
        })
    connectOrCreate?: ArticleCreateOrConnectWithoutcommentsInput;

    @Field(() => ArticleWhereUniqueInput, {
            nullable: true,
        })
    connect?: ArticleWhereUniqueInput;
}
