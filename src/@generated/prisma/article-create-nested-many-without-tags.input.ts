import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateOrConnectWithouttagsInput } from '../article/article-create-or-connect-withouttags.input';
import { ArticleCreateWithoutTagsInput } from '../article/article-create-without-tags.input';
import { ArticleWhereUniqueInput } from '../article/article-where-unique.input';

@InputType()
export class ArticleCreateNestedManyWithoutTagsInput {

    @Field(() => [ArticleCreateWithoutTagsInput], {
            nullable: true,
        })
    create?: Array<ArticleCreateWithoutTagsInput>;

    @Field(() => [ArticleCreateOrConnectWithouttagsInput], {
            nullable: true,
        })
    connectOrCreate?: Array<ArticleCreateOrConnectWithouttagsInput>;

    @Field(() => [ArticleWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<ArticleWhereUniqueInput>;
}
