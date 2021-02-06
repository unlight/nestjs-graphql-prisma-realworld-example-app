import { Field, InputType } from '@nestjs/graphql';
import { ArticleUncheckedCreateNestedManyWithoutAuthorInput } from '../article/article-unchecked-create-nested-many-without-author.input';
import { CommentUncheckedCreateNestedManyWithoutAuthorInput } from '../comment/comment-unchecked-create-nested-many-without-author.input';


@InputType()
export class UserUncheckedCreateInput {

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

    @Field(() => ArticleUncheckedCreateNestedManyWithoutAuthorInput, {
            nullable: true,
        })
    Article?: ArticleUncheckedCreateNestedManyWithoutAuthorInput;

    @Field(() => CommentUncheckedCreateNestedManyWithoutAuthorInput, {
            nullable: true,
        })
    Comment?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
}
