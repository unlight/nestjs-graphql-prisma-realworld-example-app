import { Article as ArticleModel } from '@generated/type-graphql/models/Article';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Tag } from '../../tag/tag.model';
import { User } from '../../user/models/user';

/**
 * Represents article object type.
 */
@ObjectType()
export class Article extends ArticleModel {
    @Field(() => ID, { nullable: false })
    id: string;

    @Field(() => [Tag], { nullable: false })
    tags: Tag[];

    @Field(() => User, { nullable: false })
    author: User;
}
