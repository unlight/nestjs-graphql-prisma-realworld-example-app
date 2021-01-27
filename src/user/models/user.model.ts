import { Article } from '@generated/article/article.model';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({})
export class User {
    @Field(() => ID, {
        nullable: false,
    })
    userId!: string;

    @Field(() => String, {
        nullable: false,
    })
    email!: string;

    @Field(() => String, {
        nullable: false,
    })
    name!: string;

    @HideField()
    password!: string;

    @Field(() => String, {
        nullable: true,
    })
    bio?: string;

    @Field(() => String, {
        nullable: true,
    })
    image?: string;

    @Field(() => [User], {
        nullable: true,
    })
    following?: Array<User>;

    @Field(() => [User], {
        nullable: true,
    })
    followers?: Array<User>;

    @Field(() => [Article], {
        nullable: true,
    })
    favoriteArticles?: Array<Article>;
}
