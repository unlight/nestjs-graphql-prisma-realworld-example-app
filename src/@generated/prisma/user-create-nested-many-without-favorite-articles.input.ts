import { Field, InputType } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutfavoriteArticlesInput } from '../user/user-create-or-connect-withoutfavorite-articles.input';
import { UserCreateWithoutFavoriteArticlesInput } from '../user/user-create-without-favorite-articles.input';
import { UserWhereUniqueInput } from '../user/user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutFavoriteArticlesInput {

    @Field(() => [UserCreateWithoutFavoriteArticlesInput], {
            nullable: true,
        })
    create?: Array<UserCreateWithoutFavoriteArticlesInput>;

    @Field(() => [UserCreateOrConnectWithoutfavoriteArticlesInput], {
            nullable: true,
        })
    connectOrCreate?: Array<UserCreateOrConnectWithoutfavoriteArticlesInput>;

    @Field(() => [UserWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<UserWhereUniqueInput>;
}
