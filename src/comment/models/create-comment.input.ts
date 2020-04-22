import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Create comment input object.
 */
@InputType()
export class CreateCommentInput {
    @IsNotEmpty()
    @Field(() => String)
    body: string;
}
