import { Field, InputType } from '@nestjs/graphql';

/**
 * Update user input type.
 */
@InputType()
export class UserUpdateInput {
    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    email?: string;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    name?: string;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    password?: string;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    bio?: string;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    image?: string;
}
