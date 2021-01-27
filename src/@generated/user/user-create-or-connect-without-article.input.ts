import { Field, InputType } from '@nestjs/graphql';

import { UserCreateWithoutArticleInput } from './user-create-without-article.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutArticleInput {
    @Field(() => UserWhereUniqueInput, {
        nullable: false,
    })
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutArticleInput, {
        nullable: false,
    })
    create!: UserCreateWithoutArticleInput;
}
