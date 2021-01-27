import { ArgsType, Field, Int } from '@nestjs/graphql';

import { UserMaxAggregateInput } from './user-max-aggregate.input';
import { UserMinAggregateInput } from './user-min-aggregate.input';
import { UserOrderByInput } from './user-order-by.input';
import { UserWhereInput } from './user-where.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class AggregateUserArgs {
    @Field(() => UserWhereInput, {
        nullable: true,
    })
    where?: UserWhereInput;

    @Field(() => [UserOrderByInput], {
        nullable: true,
    })
    orderBy?: Array<UserOrderByInput>;

    @Field(() => UserWhereUniqueInput, {
        nullable: true,
    })
    cursor?: UserWhereUniqueInput;

    @Field(() => Int, {
        nullable: true,
    })
    take?: number;

    @Field(() => Int, {
        nullable: true,
    })
    skip?: number;

    @Field(() => Boolean, {
        nullable: true,
    })
    count?: true;

    @Field(() => UserMinAggregateInput, {
        nullable: true,
    })
    min?: UserMinAggregateInput;

    @Field(() => UserMaxAggregateInput, {
        nullable: true,
    })
    max?: UserMaxAggregateInput;
}
