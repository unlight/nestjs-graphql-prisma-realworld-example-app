import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

import { UserExistsValidator } from '../validators/user-exists.validator';

/**
 * Input type for create user mutation.
 */
@InputType()
export class UserCreateInput {
    @IsNotEmpty()
    @IsEmail()
    @Field(() => String, { nullable: false })
    @Validate(UserExistsValidator)
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    @Field(() => String, { nullable: false })
    @Validate(UserExistsValidator)
    name: string;

    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    password: string;
}
