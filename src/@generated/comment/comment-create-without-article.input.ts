import { Field, InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCommentInput } from '../prisma/user-create-nested-one-without-comment.input';


@InputType()
export class CommentCreateWithoutArticleInput {

    @Field(() => String, {
            nullable: true,
        })
    commentId?: string;

    @Field(() => Date, {
            nullable: true,
        })
    createdAt?: Date | string;

    @Field(() => Date, {
            nullable: true,
        })
    updatedAt?: Date | string;

    @Field(() => String, {
            nullable: false,
        })
    body!: string;

    @Field(() => UserCreateNestedOneWithoutCommentInput, {
            nullable: false,
        })
    author!: UserCreateNestedOneWithoutCommentInput;
}
