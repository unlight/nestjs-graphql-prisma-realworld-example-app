import { Field, InputType } from '@nestjs/graphql';

import { CommentUncheckedCreateManyWithoutAuthorInput } from '../comment/comment-unchecked-create-many-without-author.input';

@InputType()
export class UserUncheckedCreateWithoutArticleInput {
    @Field(() => String, {
        nullable: true,
    })
    userId?: string;

    @Field(() => String, {
        nullable: false,
    })
    email!: string;

    @Field(() => String, {
        nullable: false,
    })
    name!: string;

    @Field(() => String, {
        nullable: false,
    })
    password!: string;

    @Field(() => String, {
        nullable: true,
    })
    bio?: string;

    @Field(() => String, {
        nullable: true,
    })
    image?: string;

    @Field(() => CommentUncheckedCreateManyWithoutAuthorInput, {
        nullable: true,
    })
    Comment?: CommentUncheckedCreateManyWithoutAuthorInput;
}
