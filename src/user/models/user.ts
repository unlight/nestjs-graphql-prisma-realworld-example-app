import { User as UserModel } from '@generated/type-graphql/models/User';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * Represents user object type.
 */
@ObjectType()
export class User extends UserModel {
    @Field(() => ID, {
        nullable: false,
        description: undefined,
    })
    id: string;
}
