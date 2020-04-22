import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * Represents tag object type.
 */
@ObjectType()
export class Tag {
    @Field(() => ID, { nullable: false })
    id: string;

    @Field(() => String, { nullable: false })
    name: string;
}
