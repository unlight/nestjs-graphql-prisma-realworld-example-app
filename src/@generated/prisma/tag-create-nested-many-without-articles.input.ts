import { Field, InputType } from '@nestjs/graphql';
import { TagCreateOrConnectWithoutarticlesInput } from '../tag/tag-create-or-connect-withoutarticles.input';
import { TagCreateWithoutArticlesInput } from '../tag/tag-create-without-articles.input';
import { TagWhereUniqueInput } from '../tag/tag-where-unique.input';

@InputType()
export class TagCreateNestedManyWithoutArticlesInput {

    @Field(() => [TagCreateWithoutArticlesInput], {
            nullable: true,
        })
    create?: Array<TagCreateWithoutArticlesInput>;

    @Field(() => [TagCreateOrConnectWithoutarticlesInput], {
            nullable: true,
        })
    connectOrCreate?: Array<TagCreateOrConnectWithoutarticlesInput>;

    @Field(() => [TagWhereUniqueInput], {
            nullable: true,
        })
    connect?: Array<TagWhereUniqueInput>;
}