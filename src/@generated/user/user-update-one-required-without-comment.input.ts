import { Field, InputType } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutCommentInput } from './user-create-or-connect-without-comment.input';
import { UserCreateWithoutCommentInput } from './user-create-without-comment.input';
import { UserUpdateWithoutCommentInput } from './user-update-without-comment.input';
import { UserUpsertWithoutCommentInput } from './user-upsert-without-comment.input';
import { UserWhereUniqueInput } from './user-where-unique.input';


@InputType()
export class UserUpdateOneRequiredWithoutCommentInput {

    @Field(() => UserCreateWithoutCommentInput, {
            nullable: true,
        })
    create?: UserCreateWithoutCommentInput;

    @Field(() => UserCreateOrConnectWithoutCommentInput, {
            nullable: true,
        })
    connectOrCreate?: UserCreateOrConnectWithoutCommentInput;

    @Field(() => UserUpsertWithoutCommentInput, {
            nullable: true,
        })
    upsert?: UserUpsertWithoutCommentInput;

    @Field(() => UserWhereUniqueInput, {
            nullable: true,
        })
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutCommentInput, {
            nullable: true,
        })
    update?: UserUpdateWithoutCommentInput;
}
