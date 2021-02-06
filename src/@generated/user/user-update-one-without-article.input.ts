import { Field, InputType } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutArticleInput } from './user-create-or-connect-without-article.input';
import { UserCreateWithoutArticleInput } from './user-create-without-article.input';
import { UserUpdateWithoutArticleInput } from './user-update-without-article.input';
import { UserUpsertWithoutArticleInput } from './user-upsert-without-article.input';
import { UserWhereUniqueInput } from './user-where-unique.input';


@InputType()
export class UserUpdateOneWithoutArticleInput {

    @Field(() => UserCreateWithoutArticleInput, {
            nullable: true,
        })
    create?: UserCreateWithoutArticleInput;

    @Field(() => UserCreateOrConnectWithoutArticleInput, {
            nullable: true,
        })
    connectOrCreate?: UserCreateOrConnectWithoutArticleInput;

    @Field(() => UserUpsertWithoutArticleInput, {
            nullable: true,
        })
    upsert?: UserUpsertWithoutArticleInput;

    @Field(() => UserWhereUniqueInput, {
            nullable: true,
        })
    connect?: UserWhereUniqueInput;

    @Field(() => Boolean, {
            nullable: true,
        })
    disconnect?: boolean;

    @Field(() => Boolean, {
            nullable: true,
        })
    delete?: boolean;

    @Field(() => UserUpdateWithoutArticleInput, {
            nullable: true,
        })
    update?: UserUpdateWithoutArticleInput;
}
