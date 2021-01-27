import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentUncheckedCreateWithoutArticleInput {
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

    @Field(() => String, {
        nullable: false,
    })
    authorId!: string;
}
