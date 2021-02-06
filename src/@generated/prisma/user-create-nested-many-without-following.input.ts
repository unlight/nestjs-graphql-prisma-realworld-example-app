import { Field, InputType } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutfollowingInput } from '../user/user-create-or-connect-withoutfollowing.input';
import { UserCreateWithoutFollowingInput } from '../user/user-create-without-following.input';
import { UserWhereUniqueInput } from '../user/user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutFollowingInput {

    @Field(() => [UserCreateWithoutFollowingInput], {
            nullable: true,
        })
    create?: Array<UserCreateWithoutFollowingInput>;

    @Field(() => [UserCreateOrConnectWithoutfollowingInput], {
            nullable: true,
        })
    connectOrCreate?: Array<UserCreateOrConnectWithoutfollowingInput>;

    @Field(() => [UserWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<UserWhereUniqueInput>;
}
