import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ArticleScalarWhereInput {
    @Field(() => [ArticleScalarWhereInput], { nullable: true })
    AND?: Array<ArticleScalarWhereInput>;

    @Field(() => [ArticleScalarWhereInput], { nullable: true })
    OR?: Array<ArticleScalarWhereInput>;

    @Field(() => [ArticleScalarWhereInput], { nullable: true })
    NOT?: Array<ArticleScalarWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    articleId?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    slug?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    title?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    description?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    body?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    updatedAt?: DateTimeFilter;

    @Field(() => IntFilter, { nullable: true })
    favoritesCount?: IntFilter;

    @Field(() => StringFilter, { nullable: true })
    authorId?: StringFilter;
}
