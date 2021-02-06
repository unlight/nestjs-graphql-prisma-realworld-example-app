import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateOrConnectWithoutauthorInput } from './article-create-or-connect-withoutauthor.input';
import { ArticleCreateWithoutAuthorInput } from './article-create-without-author.input';
import { ArticleWhereUniqueInput } from './article-where-unique.input';

@InputType()
export class ArticleUncheckedCreateNestedManyWithoutAuthorInput {

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
