import { Field, InputType } from '@nestjs/graphql';
import { ArticleCreateNestedManyWithoutTagsInput } from '../prisma/article-create-nested-many-without-tags.input';


@InputType()
export class TagCreateInput {

    @Field(() => String, {
            nullable: true,
        })
    tagId?: string;

    @Field(() => String, {
            nullable: false,
        })
    name!: string;

    @Field(() => ArticleCreateNestedManyWithoutTagsInput, {
            nullable: true,
        })
    articles?: ArticleCreateNestedManyWithoutTagsInput;
}
