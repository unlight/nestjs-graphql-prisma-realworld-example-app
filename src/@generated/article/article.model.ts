import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Comment } from '../comment/comment.model';
import { Tag } from '../tag/tag.model';
import { User } from '../user/user.model';

@ObjectType()
export class Article {
    @Field(() => ID, {
        nullable: false,
    })
    articleId!: string;

    @Field(() => String, {
        nullable: false,
    })
    slug!: string;

    @Field(() => String, {
        nullable: false,
    })
    title!: string;

    @Field(() => String, {
        nullable: false,
    })
    description!: string;

    @Field(() => String, {
        nullable: false,
    })
    body!: string;

    @Field(() => [Tag], {
        nullable: true,
    })
    tags?: Array<Tag>;

    @Field(() => Date, {
        nullable: false,
    })
    createdAt!: Date | string;

    @Field(() => Date, {
        nullable: false,
    })
    updatedAt!: Date | string;

    @Field(() => Int, {
        nullable: false,
        defaultValue: 0,
    })
    favoritesCount!: number;

    @Field(() => User, {
        nullable: true,
    })
    author?: User;

    @Field(() => String, {
        nullable: true,
    })
    readonly authorId?: string;

    @Field(() => [User], {
        nullable: true,
    })
    favoritedBy?: Array<User>;

    @Field(() => [Comment], {
        nullable: true,
    })
    comments?: Array<Comment>;
}
