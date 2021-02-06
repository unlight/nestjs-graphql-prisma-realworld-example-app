import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateOrConnectWithoutauthorInput } from '../article/article-create-or-connect-withoutauthor.input';
import { ArticleCreateWithoutAuthorInput } from '../article/article-create-without-author.input';
import { ArticleWhereUniqueInput } from '../article/article-where-unique.input';

@InputType()
export class ArticleCreateNestedManyWithoutAuthorInput {

    @Field(() => [ArticleCreateWithoutAuthorInput], {
            nullable: true,
        })
    create?: Array<ArticleCreateWithoutAuthorInput>;

    @Field(() => [ArticleCreateOrConnectWithoutauthorInput], {
            nullable: true,
        })
    connectOrCreate?: Array<ArticleCreateOrConnectWithoutauthorInput>;

    @Field(() => [ArticleWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<ArticleWhereUniqueInput>;
}
