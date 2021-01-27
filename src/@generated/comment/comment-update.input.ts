import { Field, InputType } from '@nestjs/graphql';

import { ArticleUpdateOneWithoutCommentsInput } from '../article/article-update-one-without-comments.input';
import { UserUpdateOneRequiredWithoutCommentInput } from '../user/user-update-one-required-without-comment.input';

@InputType()
export class CommentUpdateInput {
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
        nullable: true,
    })
    body?: string;

    @Field(() => UserUpdateOneRequiredWithoutCommentInput, {
        nullable: true,
    })
    author?: UserUpdateOneRequiredWithoutCommentInput;

    @Field(() => ArticleUpdateOneWithoutCommentsInput, {
        nullable: true,
    })
    article?: ArticleUpdateOneWithoutCommentsInput;
}
