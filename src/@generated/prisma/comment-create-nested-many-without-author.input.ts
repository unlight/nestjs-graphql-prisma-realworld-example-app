import { Field, InputType } from '@nestjs/graphql';
import { CommentCreateOrConnectWithoutauthorInput } from '../comment/comment-create-or-connect-withoutauthor.input';
import { CommentCreateWithoutAuthorInput } from '../comment/comment-create-without-author.input';
import { CommentWhereUniqueInput } from '../comment/comment-where-unique.input';

@InputType()
export class CommentCreateNestedManyWithoutAuthorInput {

    @Field(() => [CommentCreateWithoutAuthorInput], {
            nullable: true,
        })
    create?: Array<CommentCreateWithoutAuthorInput>;

    @Field(() => [CommentCreateOrConnectWithoutauthorInput], {
            nullable: true,
        })
    connectOrCreate?: Array<CommentCreateOrConnectWithoutauthorInput>;

    @Field(() => [CommentWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<CommentWhereUniqueInput>;
}
