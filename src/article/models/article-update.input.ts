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
 * Update article input type.
 */
@InputType()
export class ArticleUpdateInput {
    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @Field(() => String, { nullable: true })
    body: string;

    @IsOptional()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    @MaxLength(50, { each: true })
    @ArrayUnique()
    @Field(() => [String], { nullable: true })
    tags?: string[];
}
