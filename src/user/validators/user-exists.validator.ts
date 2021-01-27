import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

/**
 * Custom validator, checks for name/email unique.
 * Make sure that all your dependencies are not SCOPE.Default'ed.
 */
@ValidatorConstraint({ name: 'user', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    /**
     * Method should return true, if name is not taken.
     */
    async validate(name: string, args: ValidationArguments) {
        const result = await this.userService.findOne({ name });
        return result === null;
    }

    defaultMessage(args: ValidationArguments) {
        return 'User with $property $value already exists';
    }
}
