import { Field, InputType } from '@nestjs/graphql';
import {
    ArrayUnique,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

/**
 * Create article input object type.
 */
@InputType()
export class ArticleCreateInput {
    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    title: string;

    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    description: string;

    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    body: string;

    @IsOptional()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    @MaxLength(50, { each: true })
    @ArrayUnique()
    @Field(() => [String], { nullable: true })
    tags?: string[];
}
