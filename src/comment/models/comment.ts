import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/models/user';

/**
 * Represents article comment object type.
 */
@ObjectType()
export class Comment {
    @Field(() => ID)
    id: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => String)
    body: string;

    @Field(() => String)
    authorId: string;

    @Field(() => User)
    author: User;
}
