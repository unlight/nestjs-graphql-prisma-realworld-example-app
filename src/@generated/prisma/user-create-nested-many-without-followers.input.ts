import { Field, InputType } from '@nestjs/graphql';
import { UserCreateOrConnectWithoutfollowersInput } from '../user/user-create-or-connect-withoutfollowers.input';
import { UserCreateWithoutFollowersInput } from '../user/user-create-without-followers.input';
import { UserWhereUniqueInput } from '../user/user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutFollowersInput {

    @Field(() => [UserCreateWithoutFollowersInput], {
            nullable: true,
        })
    create?: Array<UserCreateWithoutFollowersInput>;

    @Field(() => [UserCreateOrConnectWithoutfollowersInput], {
            nullable: true,
        })
    connectOrCreate?: Array<UserCreateOrConnectWithoutfollowersInput>;

    @Field(() => [UserWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<UserWhereUniqueInput>;
}
