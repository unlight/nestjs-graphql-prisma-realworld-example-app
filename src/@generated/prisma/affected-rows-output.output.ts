import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AffectedRowsOutput {

    @Field(() => Int, {
            nullable: false,
        })
    count!: number;
}
