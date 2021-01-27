import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class UserScalarWhereInput {
    @Field(() => [UserScalarWhereInput], {
        nullable: true,
    })
    AND?: Array<UserScalarWhereInput>;

    @Field(() => [UserScalarWhereInput], {
        nullable: true,
    })
    OR?: Array<UserScalarWhereInput>;

    @Field(() => [UserScalarWhereInput], {
        nullable: true,
    })
    NOT?: Array<UserScalarWhereInput>;

    @Field(() => StringFilter, {
        nullable: true,
    })
    userId?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    email?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    name?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    password?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    bio?: StringFilter;

    @Field(() => StringFilter, {
        nullable: true,
    })
    image?: StringFilter;
}
