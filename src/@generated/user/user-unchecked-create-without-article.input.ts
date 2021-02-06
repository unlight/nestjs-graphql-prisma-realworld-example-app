import { Field, InputType } from '@nestjs/graphql';
import { CommentUncheckedCreateNestedManyWithoutAuthorInput } from '../comment/comment-unchecked-create-nested-many-without-author.input';


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

    @Field(() => CommentUncheckedCreateNestedManyWithoutAuthorInput, {
            nullable: true,
        })
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
}
