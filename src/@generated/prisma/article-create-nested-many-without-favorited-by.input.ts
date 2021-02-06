import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateOrConnectWithoutfavoritedByInput } from '../article/article-create-or-connect-withoutfavorited-by.input';
import { ArticleCreateWithoutFavoritedByInput } from '../article/article-create-without-favorited-by.input';
import { ArticleWhereUniqueInput } from '../article/article-where-unique.input';

@InputType()
export class ArticleCreateNestedManyWithoutFavoritedByInput {

    @Field(() => [ArticleCreateWithoutFavoritedByInput], {
            nullable: true,
        })
    create?: Array<ArticleCreateWithoutFavoritedByInput>;

    @Field(() => [ArticleCreateOrConnectWithoutfavoritedByInput], {
            nullable: true,
        })
    connectOrCreate?: Array<ArticleCreateOrConnectWithoutfavoritedByInput>;

    @Field(() => [ArticleWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<ArticleWhereUniqueInput>;
}
